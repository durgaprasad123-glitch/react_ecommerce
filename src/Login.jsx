import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/login/", { username, password });
      if (res.data.success) {
        setUser({ username: res.data.username, is_staff: res.data.is_staff });
        navigate(res.data.is_staff ? "/admin" : "/products");
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "700", fontSize: "28px" }}>
          Welcome Back 👋
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                borderRadius: "12px",
                padding: "12px",
                border: "none",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600" }}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "12px",
                padding: "12px",
                border: "none",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              padding: "12px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <p style={{ fontSize: "14px", opacity: 0.8 }}>
            Don’t have an account?
          </p>
          <Button
            variant="link"
            onClick={() => navigate("/signup")}
            style={{
              textDecoration: "none",
              color: "#00c6ff",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
