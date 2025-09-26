import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import API from "./axiosConfig";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("api/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <Container className="mt-4">
      <h2>User List</h2>
      <Button variant="success" className="mb-3" onClick={() => navigate("/add-user")}>
        Add User
      </Button>
      <Table striped bordered hover>
        <thead style={{ background: "#333", color: "white" }}>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserList;
