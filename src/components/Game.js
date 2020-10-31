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
    setBoard(shuffle([...Array(50).keys()]).slice(0, size * size));
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
        <p className="instructions">
          <p className="how-to-play">How to play:</p>
          Tap each icon only once!
        </p>
        <div className="difficulty-select" onClick={() => {generateBoard(3);}}>Normal</div>
        <div className="difficulty-select" onClick={() => {generateBoard(4);}}>Hard</div>
        <div className="difficulty-select" onClick={() => {generateBoard(5);}}>Brutal</div>
        <div className="difficulty-select" onClick={() => {generateBoard(6);}}>Insane</div>
        <div className="difficulty-select" onClick={() => {generateBoard(7);}}>FML</div>
      </div>
    );
  } else if (checkForDuplicates()) {
    display = (
      <div className="defeat-screen">
        <p>Whoops, you already hit that square!<br />Better luck next time...</p>
        <button onClick={() => {resetBoard();}}>
          Give it another go?
        </button>
      </div>
    );
  } else if (
    !checkForDuplicates() &&
    clicked.length === difficulty * difficulty
  ) {
    display = (
      <div className="victory-screen">
        <p>You won! Hell yeah!<br />You must have a giant brain to be able to store all that memory!</p>
        <button
          type="submit"
          onClick={() => {
            resetBoard();
          }}
        >
          Once Again?
        </button>
      </div>
    );
  } else {
    display = (
      <Board
        squares={board}
        handleClickedSquare={handleClickedSquare}
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="game">
      <div className="score-display">
        <p>Current Streak: {clicked.length}</p>
        <p>High Score: {highScore}</p>
      </div>
      {display}
    </div>
  );
};

export default Game;
