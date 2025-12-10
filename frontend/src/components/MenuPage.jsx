import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MenuPage.css";

const MenuPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tableId = params.get("table");

  // menu items from backend
  const [menuItems, setMenuItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemsError, setItemsError] = useState(null);

  // order state
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // send-to-kitchen state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // set-vacancy error
  const [vacancyError, setVacancyError] = useState(null);

  // 🔹 fetch items from backend on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        if (!res.ok) {
          console.error("Items fetch failed with status:", res.status);
          throw new Error(`Failed to fetch items: ${res.status}`);
        }
        const data = await res.json();
        setMenuItems(data); // expecting [{id, name, price, description, category}, ...]
        setItemsError(null);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItemsError("Error loading menu items.");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  // unique categories from backend data
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  const handleAddToOrder = (item) => {
    const id = Date.now() + Math.random(); // local unique id for this order line
    const orderItem = {
      id, // local line id
      itemId: item.id, // backend item id
      name: item.name,
      price: item.price,
    };

    setOrderItems((prev) => [...prev, orderItem]);
    setSelectedOrderId(id);
    setSubmitSuccess(null); // clear old success when modifying order
    setVacancyError(null);  // clear vacancy error if they start editing again
  };

  const handleSelectOrderItem = (id) => {
    setSelectedOrderId(id);
  };

  const handleDeleteSelected = () => {
    if (selectedOrderId == null) return;
    setOrderItems((prev) => prev.filter((item) => item.id !== selectedOrderId));
    setSelectedOrderId(null);
  };

  const orderTotal = orderItems.reduce((sum, item) => sum + item.price, 0);

  // 🔹 Send to kitchen = create order
  const handleSendToKitchen = async () => {
    if (!tableId) {
      setSubmitError("No table selected.");
      return;
    }
    if (orderItems.length === 0) {
      setSubmitError("Add at least one item to the order.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    setVacancyError(null);

    const payload = {
      tableId: Number(tableId), // tableId from params
      userId: 1,  
      items: orderItems.map((item) => ({
        itemId: item.itemId,
        notes: "", 
      })),
    };

    try {
      const res = await fetch("/api/orders", { // fetches from this backend endpoint from controller
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // transform payload into a JSON
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Create order failed:", res.status, text);
        throw new Error(`Failed to create order: ${res.status}`);
      }

      const createdOrder = await res.json();
      console.log("Created order:", createdOrder);

      setSubmitSuccess("Order sent to kitchen!");
      setOrderItems([]);
      setSelectedOrderId(null);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to send order to kitchen.");
    } finally {
      setSubmitting(false);
    }
  };

  // 🔹 Set vacancy = PATCH /api/tables/{tableId}, then go back to /FOH
  const handleSetVacancy = async () => {
    if (!tableId) {
      setVacancyError("No table selected.");
      return;
    }

    setVacancyError(null);

    try {
      const res = await fetch(`/api/tables/${tableId}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        // backend rejected: table still has active orders
        setVacancyError(
          "Cannot set vacancy. This table still has orders in progress"
        );
        return;
      }

      // success – table set to vacant, go back to FOH
      navigate("/FOH");
    } catch (err) {
      console.error("Failed to set vacancy:", err);
      setVacancyError("Failed to set vacancy.");
    }
  };

  return (
    <div className="menu-page-container">
      <NavLink to="/FOH" className="back-to-foh">
        ← Back to FOH
      </NavLink>

      <div className="menu-order-container">
        {/* LEFT: Current order */}
        <div className="order-container">
          <h1>Current order</h1>
          <p className="order-table-label">Table {tableId}</p>

          <div className="order-list">
            {orderItems.length === 0 ? (
              <p className="order-empty">No items yet. Tap a menu item.</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item.id}
                  className={
                    "order-item" +
                    (item.id === selectedOrderId ? " selected" : "")
                  }
                  onClick={() => handleSelectOrderItem(item.id)}
                >
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="order-footer">
            <div className="order-total-row">
              <span>Total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            <div className="order-actions">
              <button
                className="order-delete-button"
                onClick={handleDeleteSelected}
                disabled={selectedOrderId == null}
              >
                Delete selected
              </button>

              <button
                className="order-send-button"
                onClick={handleSendToKitchen}
                disabled={orderItems.length === 0 || submitting}
              >
                {submitting ? "Sending..." : "Send to kitchen"}
              </button>
            </div>

            {/* Set Vacancy button */}
            <div className="order-actions" style={{ marginTop: "0.5rem" }}>
              <button
                className="order-vacancy-button"
                onClick={handleSetVacancy}
                disabled={!tableId}
              >
                Set Vacancy
              </button>
            </div>

            {submitError && (
              <p className="order-error" style={{ color: "red" }}>
                {submitError}
              </p>
            )}
            {submitSuccess && (
              <p className="order-success" style={{ color: "green" }}>
                {submitSuccess}
              </p>
            )}
            {vacancyError && (
              <p className="order-error" style={{ color: "red" }}>
                {vacancyError}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Menu */}
        <div className="menu-container">
          <header className="menu-header">
            <div>
              <h1>Table {tableId}</h1>
              <p>Tap items to add them to the order.</p>
            </div>
          </header>

          {loadingItems ? (
            <p>Loading menu...</p>
          ) : itemsError ? (
            <p style={{ color: "red" }}>{itemsError}</p>
          ) : (
            <div className="menu-sections">
              {categories.map((category) => {
                const itemsInCategory = menuItems.filter(
                  (item) => item.category === category
                );

                return (
                  <section key={category} className="menu-section">
                    <h2>{category}</h2>
                    <div className="menu-grid">
                      {itemsInCategory.map((item) => (
                        <div
                          key={item.id}
                          className="menu-item-card"
                          onClick={() => handleAddToOrder(item)}
                        >
                          <div className="menu-item-header">
                            <span className="menu-item-name">{item.name}</span>
                            <span className="menu-item-price">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="menu-item-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;