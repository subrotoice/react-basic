import LoginStatus from "./auth/LoginStatus";
import { useTasks } from "./tasks/TasksProvider";

const NavBar = () => {
  const { tasks } = useTasks();

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
