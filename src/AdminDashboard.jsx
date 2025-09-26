import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import API from "./axiosConfig";

function AdminDashboard() {
  const [stats, setStats] = useState({ total_products: 0, total_users: 0 });
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // null for add, object for update
  const [form, setForm] = useState({ name: "", price: "", description: "", stock: "" });

  // Fetch dashboard stats and products
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("api/dashboard-stats/");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await API.get("api/products/");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchStats();
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      const res = await API.delete(`api/products/delete/${id}/`);
      if (res.data.success) setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Open modal for update or add
  const openModal = (product = null) => {
    if (product) {
      // Update
      setCurrentProduct(product);
      setForm({
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
      });
    } else {
      // Add
      setCurrentProduct(null);
      setForm({ name: "", price: "", description: "", stock: "" });
    }
    setShowModal(true);
  };

  // Save product (add or update)
  const handleSave = async () => {
    try {
      if (currentProduct) {
        // Update existing product
        const res = await API.put(`api/products/update/${currentProduct.id}/`, form);
        if (res.data.success) {
          setProducts(products.map((p) => (p.id === currentProduct.id ? { ...p, ...form } : p)));
          setShowModal(false);
        }
      } else {
        // Add new product
        const res = await API.post("api/products/add/", form);
        if (res.data.success) {
          setProducts([...products, { ...form, id: res.data.id }]);
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{stats.total_products}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{stats.total_users}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3>Products</h3>
      <Button variant="success" className="mb-3" onClick={() => openModal(null)}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead style={{ background: "#333", color: "white" }}>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openModal(p)}>
                  Update
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add / Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? "Update Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {currentProduct ? "Save Changes" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
