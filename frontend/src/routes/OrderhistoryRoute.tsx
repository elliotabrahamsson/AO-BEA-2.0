import { useState, useEffect } from "react";
/* import { useAuth } from '../context/AuthContext'; */

type Product = {
  name: string;
  size: string;
  color: string;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  price: number;
  products: Product[];
  address: string;
};

function OrderhistoryRoute() {
  /* const { user } = useAuth(); */
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  useEffect(
    () => {
      /* if (!user) return; */
      const user = JSON.parse(localStorage.getItem("user") || "{}"); // Hämtar användaren från localStorage
      console.log("Token:", user.token);
      const token = user.token;

      fetch(`http://localhost:3000/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok)
            throw (
              (new Error("Kunde inte hämta orderhistorik"),
              console.error("Error fetching order history:", res.statusText))
            );
          return res.json();
        })
        .then((data) => {
          setOrders(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    },
    [
      /* user */
    ]
  );

  /* if (!user) return <p>Du måste vara inloggad för att se orderhistorik.</p>; */

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Orderhistorik</h2>
        {orders.length === 0 ? (
          <p>Inga tidigare ordrar.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border p-4 rounded">
                <p>
                  <strong>Order-ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Datum:</strong> {order.date}
                </p>
                <p>
                  <strong>Pris:</strong> {order.price} kr
                </p>
                <p>
                  <strong>Adress:</strong> {order.address}
                </p>
                <strong>Produkter:</strong>{" "}
                {order.products.map((product, index) => (
                  <div key={index} style={{ marginBottom: "8px" }}>
                    <strong>{product.name}</strong>
                    <div>
                      Size: <em>{product.size}</em>, Color:{" "}
                      <em>{product.color}</em>, Quantity:{" "}
                      <em>{product.quantity}</em>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
export default OrderhistoryRoute;
