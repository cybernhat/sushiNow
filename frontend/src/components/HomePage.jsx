import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Welcome employee!</h1>
      <NavLink
        to="/passcode"
        className="passcode-button">
        <button>Enter your passcode</button>
      </NavLink>
    </div>
  );
};

export default HomePage;