import React, { useEffect, useState } from "react";
import "./Resets.css";
import "./App.css";
import { CardContainer } from "./components";
import { getRootId } from "./api";

function App() {
  const [rootId, setRootId] = useState("");
  //const [uncategorizedId, setUncategorizedId] = useState("");

  //Root ID
  useEffect(() => {
    getRootId().then((id) => {
      setRootId(id);
    });
  }, []);

  return (
    <div className="App">
      {rootId ? <CardContainer parentId={rootId} /> : <p>Loading!</p>}
    </div>
  );
}

export default App;
