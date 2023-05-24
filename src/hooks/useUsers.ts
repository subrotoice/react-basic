import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // for first time data loda using useEffect
  useEffect(() => {
    setLoading(true);
    // It contains all methods for creating, Updateing, deleting user, so that App.js not not to warry abut data and can foucs on Markup and UI
    // receving two values as object, destructing here, one handel data another if browser close
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then.
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);
  // hook is just a function, have a return values, Reuren state variable so that it can reuse
  // Return an object
  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
