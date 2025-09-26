import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("api/signup/", { username, password, email });
      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f4037, #99f2c8)",
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
          Create Account ✨
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Username</Form.Label>
            <Form.Control
              type="text"
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

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              background: "linear-gradient(135deg, #00b09b, #96c93d)",
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
            Sign Up
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <p style={{ fontSize: "14px", opacity: 0.8 }}>
            Already have an account?
          </p>
          <Button
            variant="link"
            onClick={() => navigate("/login")}
            style={{
              textDecoration: "none",
              color: "#96c93d",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
