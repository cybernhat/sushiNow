import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.text())
      .then((text) => setBackendStatus(text))
      .catch(() => setBackendStatus("Error talking to backend"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <header>
        <h1>sushiNow 🍣</h1>
        <p>FOH & BOH ordering dashboard</p>
        <p>
          <strong>Backend status:</strong> {backendStatus}
        </p>
      </header>
      {/* rest of layout... */}
    </div>
  );
}

export default App;