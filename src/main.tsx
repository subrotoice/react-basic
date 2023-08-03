import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App2 from "./App2";
import AppFetchingData from "./AppFetchingData";
import "bootstrap/dist/css/bootstrap.css";
import BackEndConnection from "./BackEndConnection";
import LabTest from "./LabTest";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <LabTest /> */}
    <AppFetchingData />
    {/* <App2 /> */}
    {/* <App /> */}
    {/* <BackEndConnection /> */}
  </React.StrictMode>
);
