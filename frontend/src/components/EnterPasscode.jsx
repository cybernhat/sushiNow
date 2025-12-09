import { useState } from "react";
import { useNavigate } from "react-router-dom";   // ⬅️ add this
import "./EnterPasscode.css";

const PasscodeScreen = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();                // ⬅️ router navigation

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const handleClick = (key) => {
    setInput((prev) => prev + key);
  };

  const handleClear = () => setInput("");

  const handleEnter = () => {
    if (input === "9172") {
      navigate("/FOH");
    } else if (input === "6767") {
      navigate("/BOH");
    } else {
      alert("Incorrect passcode");
    }
  };

  return (
    <div className="passcode-wrapper">
      <div className="passcode-screen">
        <h2>Enter Passcode</h2>

        <div className="passcode-display">
          {input || "••••"}
        </div>

        <div className="keypad">
          {keys.map((key) => (
            <button
              key={key}
              className="keypad-key"
              onClick={() => handleClick(key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Clear + Enter */}
        <div className="passcode-actions">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleEnter}>Enter</button>
        </div>
      </div>
    </div>
  );
};

export default PasscodeScreen;