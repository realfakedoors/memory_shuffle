import React, { useState, useEffect } from "react";

import Board from "./Board";

import shuffle from "lodash.shuffle";
import isEqual from "lodash.isequal";
import uniq from "lodash.uniq";

const Game = () => {
  const [board, setBoard] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    if (clicked.length > highScore) {
      setHighScore(highScore + 1);
    }
  }, [clicked.length, highScore]);

  function generateBoard(size) {
    setDifficulty(size);
    setBoard(shuffle([...Array(50).keys()]).slice(0, size));
  }

  function resetBoard() {
    setDifficulty(0);
    setClicked([]);
  }

  function handleClickedSquare(icon) {
    setBoard(shuffle(board));
    setClicked(clicked.concat(icon));
  }

  function checkForDuplicates() {
    if (!isEqual(uniq(clicked).sort(), clicked.sort()) && clicked.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  let display;

  if (difficulty === 0) {
    display = (
      <div className="new-game">
        <p>Don't tap the same card twice!</p>
        <p>select difficulty:</p>
        <button
          type="submit"
          onClick={() => {
            generateBoard(9);
          }}
        >
          Easy
        </button>
        <button
          type="submit"
          onClick={() => {
            generateBoard(16);
          }}
        >
          Hard
        </button>
        <button
          type="submit"
          onClick={() => {
            generateBoard(25);
          }}
        >
          Insane
        </button>
      </div>
    );
  } else if (checkForDuplicates()) {
    display = (
      <div className="defeat-screen">
        <p>Aww, you lost!</p>
        <button
          type="submit"
          onClick={() => {
            resetBoard();
          }}
        >
          Try Again?
        </button>
      </div>
    );
  } else if ((!checkForDuplicates()) && clicked.length === difficulty) {
    display = (
      <div className="victory-screen">
        <p>You won! Hell yeah!</p>
        <button
          type="submit"
          onClick={() => {
            resetBoard();
          }}
        >
          Try Again?
        </button>
      </div>
    );
  } else {
    display = (
      <Board squares={board} handleClickedSquare={handleClickedSquare} />
    );
  }

  return (
    <div className="game">
      <div className="score-display">
        <p>Current Score: {clicked.length}</p>
        <p>High Score: {highScore}</p>
      </div>
      {display}
    </div>
  );
};

export default Game;
