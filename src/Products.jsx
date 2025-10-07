import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./services/context/AuthContext";
import API from "./axiosConfig"; // ✅ Use centralized axios instance
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext); // get token from context

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return; // don't fetch if token not available
      try {
        const res = await API.get("products/", {
          headers: { Authorization: `Token ${token}` }, // ✅ attach token
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.response?.data || err.message);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <Container className="mt-4">
      <h2>Products</h2>
      <Row>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <Col md={4} key={p.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Card.Text>Price: ₹{p.price}</Card.Text>
                  <Card.Text>Stock: {p.stock}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
