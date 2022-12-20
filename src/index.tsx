// 各モジュールの読み込み
import { useState } from 'react';  // ①
import { createRoot } from 'react-dom/client'
import './index.css'

type SquareState = "X" | "O" | null;

type SquareProps = {
  value: SquareState;
  onClick: () => void;
};

// Squareコンポーネント
// Propsの受け取り 型もオブジェクトになる
const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

type BoardState = SquareState[];

type GameState = {
  squares: BoardState;
  xIsNext: boolean;
};

// Boardコンポーネント
const Board = () => {
  const [state, setState] = useState<GameState>({
    squares: Array(9).fill(null),
    xIsNext: true
  })

  // const status = "Next player: " + (state.xIsNext ? "X" : "O");
  const winner = calculateWinner(state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      squares: squares,
      xIsNext: !state.xIsNext
    });
  };

  // 引数を受け取ってコンポーネントに文字列を渡す
  const renderSquare = (i: number) => (
    // Props経由でvalueに文字列を渡す
    <Square
      // value={i.toString()}
      value={state.squares[i]}
      onClick={() => handleClick(i)}
    />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* valueとして数値を渡す */}
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

// Gameコンポーネント
const Game = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info'>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// レンダリング
const container = document.getElementById('root');
const root = createRoot(container!);
// root.render(<Board />);
root.render(<Game />);

// 勝者確認関数
const calculateWinner = (squares: BoardState):SquareState => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null
}
