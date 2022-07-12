import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/login/" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default Main;
