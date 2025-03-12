import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from "../src/game/page1";
import Page2 from "../src/game/page2/page2";
import Board from "../src/game/board/board";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/page2" element={<Page2/>} />
        <Route path="/board" element={<Board/>} />
      </Routes>
    </Router>
  );
}
export default App;

