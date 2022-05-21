import React, { useEffect, useState } from "react";
import "./Resets.css";
import "./App.css";
import { BookmarkContainer, CardContainer } from "./components";
import { getRootId, getUncategorizedId } from "./api";

function App() {
  const [rootId, setRootId] = useState("");
  const [uncategorizedId, setUncategorizedId] = useState("");

  //Root ID
  useEffect(() => {
    getRootId().then((id) => {
      setRootId(id);
    });
  }, []);

  //Uncategorized ID
  useEffect(() => {
    getUncategorizedId().then((id) => {
      setUncategorizedId(id);
    });
  }, []);

  return (
    <div className="App">
      {uncategorizedId ? (
        <BookmarkContainer parentId={uncategorizedId} />
      ) : (
        <p>Loading!</p>
      )}
      {rootId ? <CardContainer parentId={rootId} /> : <p>Loading!</p>}
    </div>
  );
}

export default App;
