import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Products from "./Products";
import AdminDashboard from "./AdminDashboard";
import UserList from "./UserList";
import NavbarComp from "./Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <NavbarComp user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to={user.is_staff ? "/admin" : "/products"} /> : <Login setUser={setUser} />
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.is_staff ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={user && user.is_staff ? <UserList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
