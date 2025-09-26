import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/products/add/", { name, price, description, stock });
      if (res.data.success) {
        setSuccess("Product added successfully!");
        setError("");
        // Optionally redirect to products page after 1 second
        setTimeout(() => navigate("/products"), 1000);
      } else {
        setError(res.data.error);
        setSuccess("");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Add Product</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleAddProduct}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Product
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default AddProduct;
