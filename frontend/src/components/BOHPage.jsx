import { NavLink } from "react-router-dom";

const BOHPage = () => {
    return (
        <div className="BOH-container">
        <NavLink to="/" className="home-button">
            <button>Home</button>
        </NavLink>
        </div>
    )
}

export default BOHPage;