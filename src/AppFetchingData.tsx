import "bootstrap/dist/css/bootstrap.css";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const AppFetchingData = () => {
  // This codding is absolutly fine no need to create hook, but if we need to recreate same code then we can use it accross various component
  // Custom hook: Hook just a function, Return a object
  const { users, error, isLoading, setUsers, setError } = useUsers();
  const deleteUser = (user: User) => {
    const originalUser = [...users]; // Store all users in another variable before delete
    setUsers(users.filter((u) => u.id != user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUser); // If error occure then Get back to original user
    });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
    userService
      .create(newUser)
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
    userService.update(user).catch((err) => {
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
