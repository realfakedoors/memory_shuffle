import React from "react";

import Square from "./Square";

const Board = (props) => {
  function displaySquares(square) {
    return (
      <Square icon={square} handleClickedSquare={props.handleClickedSquare} />
    );
  }

  return (
    <div className="board">
      {props.squares.map(displaySquares)}
    </div>
  );
};

export default Board;
