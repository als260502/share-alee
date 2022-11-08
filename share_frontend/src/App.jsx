import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./container/Home";
import { Login } from "./components/Login";

import "./index.css";
import { useAuthStore } from "./store/authStore";

function App() {
  const navigate = useNavigate();
  const { userProfile: user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
