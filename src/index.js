import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";
import "core-js/es/map";
import "core-js/es/set";
import { UiDataProvider } from "./context/uiContext";
import { UserDataProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <UiDataProvider>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </UiDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
