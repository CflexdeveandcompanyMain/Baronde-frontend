import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="866408853892-kdh6vkhasr1c832buvt6fdmvtttf42i4.apps.googleusercontent.com">
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
