// App.js

import {  BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import {  AuthProvider } from "./auth/AuthContext"; // assuming AuthContext is set up as we discussed
import PrivateRoute from "./auth/ProtectedRoute"; // role-based routing component
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import NewOrder from "./pages/Admin/NewOrder";
import SupplierOrders from "./pages/Supplier/SupplierOrders";
import Login from "./pages/Login"; // Your Login page component
import ProtectedRoute from "./auth/ProtectedRoute";
import Register from "./pages/Register";
import { Fragment } from "react";

// const App = () => {
//   const { user } = useAuth(); // Get user info (role, etc.)

//   const routes = useRoutes([
//     {
//       path: "/",
//       element: <AdminOrders />, // Login page route
//     },
//     {
//       path: "/admin",
//       element: (
//         <PrivateRoute allowedRoles={["admin"]}>
//           <AdminDashboard />
//         </PrivateRoute>
//       ), // Admin dashboard route
//     },
//     {
//       path: "/admin/orders",
//       element: (
//         <PrivateRoute allowedRoles={["admin"]}>
//           <AdminOrders />
//         </PrivateRoute>
//       ), // Admin orders route
//     },
//     {
//       path: "/admin/orders/new",
//       element: (
//         <PrivateRoute allowedRoles={["admin"]}>
//           <NewOrder />
//         </PrivateRoute>
//       ), // Create new order for admin
//     },
//     {
//       path: "/orders",
//       element: (
//         <PrivateRoute allowedRoles={["supplier"]}>
//           <SupplierOrders />
//         </PrivateRoute>
//       ), // Supplier orders route
//     },
//     {
//       path: "/unauthorized",
//       element: <h2>אין לך גישה לעמוד זה</h2>, // Unauthorized access page
//     },
   
//   ]);

//   return routes;
// };
const App = () => {
  return (
    <Router>
      <Fragment>
        
        <Routes>
        
          <Route  path='/' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route path='/admin/orders' element={<AdminOrders/>}/>
          
        <Route path='/register' element={Register} />
        <Route path='/admin/orders/new' element={NewOrder}  />
        <Route t path='/orders' element ={SupplierOrders}  /> 
        </Routes>
      </Fragment>
    </Router>

 
  );};

export default App;
