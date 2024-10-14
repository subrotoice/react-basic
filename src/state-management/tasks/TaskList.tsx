import useAuthStore from "../auth/store";
import { useTasks } from "./TasksProvider";

const TaskList = () => {
  const { tasks, dispatch } = useTasks();
  const { user } = useAuthStore();

  return (
    <div>
      <button
        className="btn btn-primary"
        disabled={user == ""}
        onClick={() =>
          dispatch({
            type: "ADD",
            task: { taskId: Date.now(), name: "task-" + Date.now() },
          })
        }
      >
        Add Task
      </button>
      {tasks &&
        tasks.map((task) => (
          <p key={task.taskId}>
            {task.name}{" "}
            <button
              onClick={() => dispatch({ type: "DELETE", taskId: task.taskId })}
              className="btn btn-danger my-1"
            >
              Delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default TaskList;
