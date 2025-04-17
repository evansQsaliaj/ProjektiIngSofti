import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./context/jobs.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Auth0Provider
        domain="dev-hfqv26fllmucckwk.eu.auth0.com"
        clientId="lFqK33imHwUacEVc8zcUMFVAOEw9yP4q"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);
