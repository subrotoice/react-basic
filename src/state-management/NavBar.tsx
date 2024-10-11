import React, { useContext } from "react";
import TasksContext from "./contexts/TaskContext";
import LoginStatus from "./LoginStatus";

const NavBar = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <div className="d-flex justify-content-between">
      <h2>NavBar</h2>
      <p>Total Tasks: {tasks.length}</p>
      <div>
        <LoginStatus />
      </div>
    </div>
  );
};

export default NavBar;
