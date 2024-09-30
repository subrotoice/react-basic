import useAuth from "./useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/HomePage/Header";

const PrivateRoutes = () => {
  const loginUser = useAuth();
  if (!loginUser.user) return <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
