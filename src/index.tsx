// 各モジュールの読み込み
import { useState } from 'react';  // ①
import { createRoot } from 'react-dom/client'
import './index.css'

type SquareState = string;

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
};

// Boardコンポーネント
const Board = () => {
  const [state, setState] = useState<GameState>({
    squares: Array(9).fill(null)
  })

  const handleClick = (i: number) => {
    const squares = state.squares.slice();
    squares[i] = "X";
    setState({ squares: squares });
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
      <div className="status">{"Next player: X"}</div>
      <div className="board-row">
        {/* valueとして数値を渡す */}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
      </div>
      <div className="board-row">
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
      </div>
      <div className="board-row">
        {renderSquare(7)}
        {renderSquare(8)}
        {renderSquare(9)}
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
