// 各モジュールの読み込み
import { createRoot } from 'react-dom/client'
import './index.css'

// Squareコンポーネント
// const Square = () => {
function Square() {
  return (
    <button className="square">
      {/* ここに表示する文字を記述 */}
    </button>
  );
};

// Boardコンポーネント
const Board = () => {
  const renderSquare = ({}) => (
    <Square />
  );

  return (
    <div>
      <div className="status">{"Next player: X"}</div>
      <div className="board-row">
        {/* valueとして"O"を渡す */}
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
