import React from "react";

const Square = (props) => {  
  function iconLocator(){
    return process.env.PUBLIC_URL + "/icons/icon-" + props.icon + ".svg";
  };
  
  function handleClick(){
    props.handleClickedSquare(props.icon);
  }

  return (
    <div className="square">
      <img src={iconLocator()} alt="" onClick={handleClick} />
    </div>
  );
};

export default Square;
