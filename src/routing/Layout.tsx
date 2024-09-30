import Header from "../components/HomePage/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <h1>From Layout</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
