import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
