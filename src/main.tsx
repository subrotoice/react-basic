import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import App2 from "./App2";
import AppFetchingData from "./AppFetchingData";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import BackEndConnection from "./BackEndConnection";
import LabTest from "./LabTest";
import AppReactQuery from "./AppReactQuery";
import MyApp from "./MyApp";

const queryClient = new QueryClient(); // this line added

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
    {/* <LabTest /> */}
    {/* <AppFetchingData /> */}
    {/* <App2 /> */}
    {/* <QueryClientProvider client={queryClient}>
      <AppReactQuery />
      <ReactQueryDevtools />
    </QueryClientProvider> */}
    {/* <BackEndConnection /> */}
  </React.StrictMode>
);
