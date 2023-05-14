import React from "react";
import axios, { CanceledError } from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
interface User {
  id: number;
  name: string;
}
const AppFetchingData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then
        setError(err.message);
      });

    return () => controller.abort();
  }, []); // Only first time run
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppFetchingData;
