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
import PostList from "./react-query/PostList";
import { RouterProvider } from "react-router-dom";
import router from "./routing/router";
import Counter from "./state-management/counter/Counter";
import TaskList from "./state-management/tasks/TaskList";
import AppStateManagement from "./AppStateManagement";

const queryClient = new QueryClient(); // this line added

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <MyApp /> */}
      {/* <PostList /> */}
      {/* <RouterProvider router={router} /> */}
      {/* <Counter /> */}
      <AppStateManagement />
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
