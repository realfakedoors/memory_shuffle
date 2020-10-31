import React from "react";
import ReactDOM from "react-dom";

import Game from "./components/Game";

import "./custom.css";
import "./reset.css";

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
