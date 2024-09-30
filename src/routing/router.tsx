import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import HomePage from "./HomePage";
import UserDetailsPage from "./UserDetailsPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/users/:id", element: <UserDetailsPage /> },
]);

export default router;
