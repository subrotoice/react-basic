import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Header from "../components/HomePage/Header";

const ErrorPage = () => {
  const routeError = useRouteError();
  return (
    <div>
      <Header />
      <h1>Oops...</h1>
      <p>Sorry! Unexprected error happened</p>
      <p>
        {isRouteErrorResponse(routeError)
          ? "Invalide Page"
          : "Unexpected Error"}
      </p>
    </div>
  );
};

export default ErrorPage;
