import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store.jsx";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { HelmetProvider } from "react-helmet-async";  

const options = {
  timeout: 5000, 
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <HelmetProvider> 
          <App />
        </HelmetProvider>
      </AlertProvider>
    </Provider>
  </StrictMode>
);