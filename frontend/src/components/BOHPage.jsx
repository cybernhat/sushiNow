import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BOHPage.css";

const BOHPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();

                // 🔥 sort by createdAt (earliest first)
                const sorted = data.sort((a, b) => b.id - a.id);

                setOrders(sorted);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="BOH-container">
            <NavLink to="/" className="home-button">
                <button>Home</button>
            </NavLink>

            <h1>Kitchen Orders</h1>

            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No active orders.</p>
                ) : (
                    orders
                        .filter(order => order.status === "pending" || order.status === "in progress")   // ⬅ only pending
                        .map((order) => (
                            <button
                                key={order.id}
                                className={`order-button ${order.status === "in progress" ? "in-progress" : ""}`}
                                onClick={() => navigate(`/BOH/orders/${order.id}`)}
                            >
                                Order #{order.id} — Table {order.table.id} — {order.status}
                                <br />
                                <span className="order-time">
                                    Created: {formatTime(order.createdAt)}
                                </span>
                            </button>
                        ))
                )}
            </div>
        </div>
    );
};

export default BOHPage;