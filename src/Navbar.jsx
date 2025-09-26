import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavbarComp({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>Ecommerce Store</Navbar.Brand>
        <Nav className="me-auto">
          {user && !user.is_staff && <Nav.Link onClick={() => navigate("/products")}>Products</Nav.Link>}
          {user && user.is_staff && <Nav.Link onClick={() => navigate("/admin")}>Admin Dashboard</Nav.Link>}
          {user && user.is_staff && <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link>}
        </Nav>
        {user ? (
          <Button variant="outline-light" onClick={logout}>Logout</Button>
        ) : (
          <Button variant="outline-light" onClick={() => navigate("/login")}>Login</Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
