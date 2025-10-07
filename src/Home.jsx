// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "./services/context/AuthContext";

// export function Home() {
//   const { user, loggedIn, login, logout, token } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     console.log("Attempting login with:", { username, password });

//     try {
//       const response = await axios.post("http://localhost:8000/api/token/", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const token = response.data.token;
//         login(username, token); // save user + token in context
//         alert("Login successful");
//       } else {
//         alert("Login failed");
//       }
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);
//       alert("Login failed");
//     }
//   };

//   return (
//     <>
//       <h1>Home Page</h1>
//       <h2>User: {user || "No user logged in"}</h2>
//       {/* <h2>Logged In: {loggedIn.toString()}</h2>
//       <h2>Token: {token || "No token"}</h2> */}

//       <input
//         placeholder="username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         placeholder="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>
//       <button onClick={logout}>Logout</button>

//       {loggedIn && <h2>Welcome, {user}</h2>}
//     </>
//   );
// }

// // ---------------- Products Component ----------------
// export function Products() {
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/products/");
//       if (response.status === 200) {
//         setProducts(response.data);
//       } else {
//         alert("Failed to fetch products");
//         console.log(response);
//       }
//     } catch (err) {
//       alert("Failed to fetch products");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []); // run once on mount

//   return (
//     <>
//       <h1>Products Page</h1>
//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               {product.name} - ₹{product.price}
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./services/context/AuthContext";
import API from "./axiosConfig"; // ✅ use centralized axios instance

export function Home() {
  const { user, loggedIn, handleLogin, token, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);

  // ---------------- Login ----------------
  const login = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    try {
      const response = await API.post("login/", { username, password }); // ✅ relative to API baseURL
      if (response.data.success) {
        handleLogin(response.data.username, response.data.token);
        alert("Login successful");
      } else {
        alert(response.data.error);
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  // ---------------- Fetch Products ----------------
  const getProducts = async (authToken) => {
    try {
      const response = await API.get("products/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.response?.data || err.message);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (token) getProducts(token); // fetch products after login
  }, [token]);

  // ---------------- Logout ----------------
  const handleLogout = () => {
    logout();
    setProducts([]);
    alert("Logged out");
  };

  return (
    <>
      <h1>Home Page</h1>

      {!loggedIn ? (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h2>Welcome, {user}</h2>
          <button onClick={handleLogout}>Logout</button>

          <h2>Products</h2>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} - ₹{product.price}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
