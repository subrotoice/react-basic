import { createContext, Dispatch } from "react";
import { Task, TaskAction } from "../reducers/tasksReducer";

interface TaskContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

const TasksContext = createContext<TaskContextType>({} as TaskContextType);

export default TasksContext;
