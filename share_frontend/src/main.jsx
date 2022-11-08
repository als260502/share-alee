import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";

import "../i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
        <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
