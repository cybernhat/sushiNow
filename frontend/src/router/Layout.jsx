// src/router/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const linkStyle = ({ isActive }) => ({
    marginRight: "1rem",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <header>
        <h1>sushiNow 🍣</h1>

        <nav>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/tables" style={linkStyle}>
            Tables
          </NavLink>
          <NavLink to="/orders" style={linkStyle}>
            Orders
          </NavLink>
          <NavLink to="/kitchen" style={linkStyle}>
            Kitchen
          </NavLink>
        </nav>
      </header>

      {/* ⬇️ THIS IS ALL YOU NEED */}
      <Outlet />
    </div>
  );
}

