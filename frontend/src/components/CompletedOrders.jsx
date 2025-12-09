import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompletedOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompleted = async () => {
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();
                setOrders(data.filter(order => order.status === "done"));
            } catch (err) {
                console.error("Failed to load completed orders", err);
            }
        };

        fetchCompleted();
    }, []);

    return (
        <div className="completed-container">
            <button onClick={() => navigate(-1)}>← Back</button>

            <h1>Completed Orders</h1>

            {orders.length === 0 ? (
                <p>No completed orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <button
                            key={order.id}
                            className="order-button done"
                            onClick={() => navigate(`/BOH/orders/${order.id}`)}
                        >
                            Order #{order.id} — Table {order.table.id}
                            <br />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompletedOrder;