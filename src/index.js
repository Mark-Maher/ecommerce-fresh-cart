import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styles from "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenContextProvider from "./Context/Token";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CartContextProvider from "./Context/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <TokenContextProvider>
    <App />
  </TokenContextProvider>
  // </React.StrictMode>
);
