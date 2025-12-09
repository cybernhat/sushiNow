import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FOHPage.css"

const FOHPage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await fetch("/api/tables");
        const data = await res.json();

        const sorted = data.sort((a, b) => a.id - b.id);
        setTables(sorted);
      } catch (err) {
        console.error("Failed to fetch tables", err);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="FOH-container">
      <button 
        className="back-button"
        onClick={() => navigate("/passcode")}
      >
        ← Back
      </button>

      <h1>Hello Nhat!</h1>
      <p>Select a table to create an order.</p>

      <div className="tables-grid">
        {tables.map((table) => (
          <button
            key={table.id}
            className={`table-button ${table.occupied ? "occupied" : ""}`}
            onClick={() => navigate(`/menu?table=${table.id}`)}
          >
            Table {table.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FOHPage;