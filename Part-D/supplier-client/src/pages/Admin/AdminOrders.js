import React, { useEffect, useState } from "react";
import API from "../../api";
import GenericTable from "../../components/utils/genericTable";
import GenericButton from "../../components/utils/genericButton";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await API.get("/orders");
        console.log("Server response:", res.data);
        console.log("Filtered orders:", res.data);        // filteredOrders is an array
        setOrders(res.data.orders);           // res.data is an array
        setFilteredOrders(res.data.orders);
      } catch (err) {
        console.error(err);
        alert("שגיאה בטעינת ההזמנות");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  // Handle order status update
  const handleStatusChange = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}`, { status: "Completed" });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Completed" } : order
        )
      );

      alert("ההזמנה סומנה כהושלמה");
    } catch (err) {
      console.error(err);
      alert("שגיאה בעדכון סטטוס ההזמנה");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", direction: "rtl" }}>
      <h2 className="text-center mb-4">ניהול הזמנות</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="form-label">סנן לפי סטטוס</label>
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">-- כל ההזמנות --</option>
          <option value="pending">ממתין</option>
          <option value="Completed">הושלם</option>
        </select>
      </div>

      {loading ? (
        <p>טוען הזמנות...</p>
      ) : (
        <GenericTable
          columns={[
            {
              header: "מזהה ספק",
              accessor: (row) => row.supplierId || "—",
            },
            {
              header: "סטטוס",
              accessor: (row) => row.status,
            },
            {
              header: "סכום כולל",
              accessor: (row) =>
                `₪${row.totalOrderPrice?.toFixed(2) || 0}`,
            },
            {
              header: "פעולה",
              accessor: (row) =>
                row.status !== "Completed" ? (
                  <GenericButton
                    variant="danger"
                    onClick={() => handleStatusChange(row._id)}
                    label="סגור הזמנה"
                  />
                ) : (
                  "הושלמה"
                ),
            },
          ]}
          data={filteredOrders || []}
        />
      )}
    </div>
  );
};

export default AdminOrders;
