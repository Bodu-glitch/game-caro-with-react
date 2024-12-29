import { useState } from "react";

import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function NotifyWinner({ winner }) {
  return <div>{winner} wins!</div>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [turnNumber, setTurnNumber] = useState(0);

  function caculateWinnerRow() {
    for (let i = 0; i < 9; i += 3) {
      if (squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
        return squares[i];
      }
    }
    return null;
  }

  function caculateWinnerColumn() {
    for (let i = 0; i < 3; i++) {
      if (squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
        return squares[i];
      }
    }
    return null;
  }

  function caculateWinnerDiagonal() {
    if (squares[0] === squares[4] && squares[0] === squares[8]) {
      return squares[0];
    }
    if (squares[2] === squares[4] && squares[2] === squares[6]) {
      return squares[2];
    }
    return null;
  }

  function caculateWinner() {
    return (
      caculateWinnerRow() || caculateWinnerColumn() || caculateWinnerDiagonal()
    );
  }

  function handleClick(i) {
    if (caculateWinner()) {
      return;
    }
    const nextSquares = squares.slice();
    if (turnNumber % 2 === 0) {
      nextSquares[i] = "O";
    } else {
      nextSquares[i] = "X";
    }
    setTurnNumber(turnNumber + 1);
    setSquares(nextSquares);
  }

  if (caculateWinner()) {
    return <NotifyWinner winner={caculateWinner()} />;
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
