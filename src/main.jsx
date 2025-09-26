import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./services/context/AuthContext";
import { Button } from "react-bootstrap";
import { Home } from "./Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthContextProvider>
     <Home/>
  </AuthContextProvider>
 
  </BrowserRouter>
);
