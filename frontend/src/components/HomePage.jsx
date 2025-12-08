import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <NavLink 
    to="/passcode" 
    className="passcode-button"> 
    Enter Passcode </NavLink>
  );
};

export default HomePage;