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


type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
};

// Boardコンポーネント
const Board = (props: BoardProps) => {
  // 引数を受け取ってコンポーネントに文字列を渡す
  const renderSquare = (i: number) => (
    // Props経由でvalueに文字列を渡す
    <Square
      // value={i.toString()}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  );

  return (
    <div>
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

type Step = {
  squares: BoardState;
};

type GameState = {
  history: Step[];
  xIsNext: boolean;
  stepNumber: number;
};

// Gameコンポーネント
const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [{
      squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat({
        squares: squares
      }),
      xIsNext: !state.xIsNext,
      stepNumber: history.length
    });
  };

  const moves = state.history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const jumpTo = (step: number) => {
    setState((prev) => ({
      ...prev,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    }));
  };

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
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
const calculateWinner = (squares: BoardState): SquareState => {
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
