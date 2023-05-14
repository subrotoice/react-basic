import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App2 from "./App2";
import AppFetchingData from "./AppFetchingData";
// import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppFetchingData />
    {/* <App2 />
    <App /> */}
  </React.StrictMode>
);
