import React from "react";
import Header from "../components/HomePage/Header";
import { Link, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const UsersPage = () => {
  const loginUser = useAuth();
  if (!loginUser.user) return <Navigate to="/login" />;

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
