import React from "react";
import Header from "../components/HomePage/Header";
import { Link, Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <div>
      <Header />
      <Link to="/users/1">User 1</Link>
      <Link to="/users/2">User 2</Link>
      <Outlet />
    </div>
  );
};

export default UsersPage;
