import { useNavigate } from "react-router-dom";

const FOHPage = () => {
  const navigate = useNavigate();
  const tables = [1, 2, 3, 4, 5, 6];

  return (
    <div className="FOH-container">
      <h1>Hello Nhat!</h1>
      <p>Select a table to create an order.</p>

      <div className="tables-grid">
        {tables.map((tableNumber) => (
          <button
            key={tableNumber}
            className="table-button"
            onClick={() => navigate(`/menu?table=${tableNumber}`)}   // <-- important
          >
            Table {tableNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FOHPage;