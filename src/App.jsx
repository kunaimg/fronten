import React from "react";
import Socket from "./data/Socket";
import "./assets/css/_app.scss";
import ChatApp from "./data/ChatApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./data/Join";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />}></Route>
        <Route path="/chatapp" element={<ChatApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
