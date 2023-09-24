import React from "react";
import Socket from "./data/Socket";
import "./assets/css/_main.scss";
import ChatApp from "./data/ChatApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./data/Join";
import Joinchat from "./data/Joinchat";
import { Enter } from "./data/Enter";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Joinchat />}></Route>
        <Route path="/" element={<Enter />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
