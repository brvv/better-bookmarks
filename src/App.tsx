import React from "react";
import "./Resets.css";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/folder/:folderId" element={<Main />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
