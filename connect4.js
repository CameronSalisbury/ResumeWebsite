// src/Connect4.js

import React, { useState } from 'react';
import './Connect4.css'; // We'll create this file next

const ROWS = 6;
const COLS = 7;

const Connect4 = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Red');

  const dropPiece = (col) => {
    const newBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        return;
      }
    }
  };

  const renderCell = (row, col) => (
    <div className="cell" onClick={() => dropPiece(col)}>
      {board[row][col] && <div className={`piece ${board[row][col]}`}></div>}
    </div>
  );

  return (
    <div className="connect4">
      <h2>{currentPlayer}'s turn</h2>
      <div className="board">
        {board.map((row, rowIndex) =>
          <div className="row" key={rowIndex}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connect4;
