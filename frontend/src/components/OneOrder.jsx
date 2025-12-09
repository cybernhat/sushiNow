import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OneOrder.css";

const OneOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order", err);
        setError("Failed to load order.");
      }
    };

    const fetchOrderItems = async () => {
      try {
        const res = await fetch(`/api/items/order/${orderId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setOrderItems(data);
      } catch (err) {
        console.error("Failed to fetch order items", err);
      }
    };

    fetchOrder();
    fetchOrderItems();
  }, [orderId]);

  const updateStatus = async (newStatus, redirectAfter = false) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "2",
          status: newStatus,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const updatedOrder = await res.json();
      setOrder(updatedOrder);

      if (redirectAfter) {
        navigate("/BOH");
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status.");
    }
  };

  const orderTotal = orderItems.reduce(
    (sum, item) => sum + (item.price ?? 0),
    0
  );

  if (error) {
    return (
      <div className="one-order-container">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="one-order-container">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>Loading order...</p>
      </div>
    );
  }

  console.log(orderItems)

  return (
    <div className="one-order-container">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>Order #{order.id}</h1>
      <p>Table: {order.table?.id}</p>

      {/* Accept → only when pending */}
      {order.status === "pending" && (
        <button onClick={() => updateStatus("in progress")}>
          Accept
        </button>
      )}

      {/* Mark as done → only when in progress */}
      {order.status === "in progress" && (
        <button onClick={() => updateStatus("done", true)}>
          Mark as done
        </button>
      )}

      <h2>Items</h2>

      {orderItems.length === 0 ? (
        <p>No items found for this order.</p>
      ) : (
        <>
          <ul className="order-items-list">
            {orderItems.map((item, index) => (
              <li key={index} className="order-item-row">
                <div className="order-item-main">
                  <span className="order-item-name">{item.name}</span>
                  {item.price != null && (
                    <span className="order-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {item.notes && item.notes.trim() !== "" && (
                  <div className="order-item-notes">
                    Notes: {item.notes}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="order-total-row">
            <span>Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OneOrder;