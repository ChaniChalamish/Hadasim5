import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", direction: "rtl" }}>
      <h2 className="text-center mb-4">דשבורד מנהל</h2>

      <div className="d-grid gap-3">
        <Link to="/admin/orders" className="btn btn-outline-primary">
          הצג את כל ההזמנות
        </Link>
        <Link to="/Admin/NewOrder" className="btn btn-outline-success">
          צור הזמנה חדשה
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
