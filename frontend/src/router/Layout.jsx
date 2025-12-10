// src/router/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css"

export default function Layout() {
  const linkStyle = ({ isActive }) => ({
    marginRight: "1rem",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <div style={{ fontFamily: "sans-serif" }} className="main-page">
      <NavLink to="/">
        <header>
          <h1>sushiNow 🍣</h1>
        </header>
      </NavLink>
      <Outlet />
    </div>
  );
}

