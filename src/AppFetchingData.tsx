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
  const [isLoading, setLoading] = useState(false);
  const [test, setTest] = useState("My Name");

  // for first time data loda using useEffect
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then.
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUser = [...users]; // Store all users in another variable before delete
    setUsers(users.filter((u) => u.id != user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser); // If error occure then Get back to original user
      });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser) // Payo
      // .then((res) => {
      //   setUsers([res.data, ...users]); // It will replace previous one
      // }); we can do this by destructiring and renaming
      .then(({ data: savedUser }) => {
        // it create code more readable
        setUsers([savedUser, ...users]); // It will replace previous one
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  const updateUser = (user: User) => {
    const originalUser = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    // patch/put() you can use depending on backend
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary my-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)} // passing user
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppFetchingData;
