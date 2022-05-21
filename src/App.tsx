import React from "react";
import "./Resets.css";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/folder/:folderId" element={<MainPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
