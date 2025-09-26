import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`api/products/${id}/`);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setStock(res.data.stock);
      } catch (err) {
        setError("Error fetching product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price < 0 || stock < 0) {
      setError("Price and stock cannot be negative");
      return;
    }
    try {
      await API.put(`api/products/update/${id}/`, {
        name,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
      });
      navigate("/products");
    } catch (err) {
      setError("Error updating product.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
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
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProduct;