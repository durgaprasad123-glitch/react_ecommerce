import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#f8f9fa", height: "100vh", padding: "20px" }}>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
        <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
