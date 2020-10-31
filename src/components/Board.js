import React from "react";

import Square from "./Square";

const Board = (props) => {
  function displaySquares(square) {
    return (
      <Square icon={square} handleClickedSquare={props.handleClickedSquare} />
    );
  }
  
  // Display a square grid regardless of difficulty.
  const gridEdge = {
    gridTemplateColumns: 'repeat(' + props.difficulty + ', auto)',
    gridTemplateRows: 'repeat(' + props.difficulty + ', auto)',
  };
  
  return (
    <div className="board" style={gridEdge}>
      {props.squares.map(displaySquares)}
    </div>
  );
};

export default Board;
