import React from "react";
import Header from "../components/HomePage/Header";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserDetailsPage = () => {
  const params = useParams();
  const [searchParams, SetSearchPrams] = useSearchParams();
  const location = useLocation();

  // http://localhost:5174/users/1?teacher=subroto
  console.log(params); // 1
  console.log(searchParams.toString()); // teacher=subroto
  console.log(searchParams.get("teacher")); // subroto
  console.log(location); // { "pathname": "/users/1", "search": "?teacher=subroto" ......}

  return (
    <div>
      <Header />
      UserDetailsPage
    </div>
  );
};

export default UserDetailsPage;
