import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loggedIn, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
