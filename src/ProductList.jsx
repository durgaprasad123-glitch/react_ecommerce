import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("api/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`api/products/delete/${id}/`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Product List</h2>
      <Button variant="success" className="mb-3" onClick={() => navigate("/add")}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead style={{ background: "#333", color: "white" }}>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => navigate(`/edit/${p.id}`)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteProduct(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;