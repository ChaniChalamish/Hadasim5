import { useEffect, useState } from "react";
import API from "../../api";
import GenericList from "../../components/utils/genericList";
import GenericButton from "../../components/utils/genericButton";
import {  Table } from "react-bootstrap";

function SupplierOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await API.put(`/orders/${id}`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "in progress" } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("שגיאה באישור הזמנה");
    }
  };

  return (
    <GenericList
      title="ההזמנות שלי"
      data={orders}
      renderSummary={(order) => (
        <>
          <p>
            <strong>סטטוס:</strong> {order.status}
          </p>
          <p>
            <strong>סה"כ מחיר הזמנה:</strong> ₪{order.totalOrderPrice}
          </p>
        </>
      )}
      renderDetails={(order) => (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>שם מוצר</th>
                <th>כמות</th>
                <th>מחיר ליחידה</th>
                <th>סה"כ</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>₪{product.pricePerItem}</td>
                  <td>₪{product.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {order.status === "pending" && (
            <div className="text-end">
              <GenericButton
                label=" אשר הזמנה"
                variant="success"
                onClick={() => handleStatusChange(order._id)}
              />
            </div>
          )}
        </>
      )}
    />
  );
}

export default SupplierOrders;
