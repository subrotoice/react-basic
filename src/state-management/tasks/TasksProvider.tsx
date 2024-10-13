import { ReactNode, useContext, useReducer } from "react";
import { createContext, Dispatch } from "react";

// Comming form taskReducer
export interface Task {
  taskId: number;
  name: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  taskId: number;
}

type TaskAction = AddTask | DeleteTask;

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  if (action.type == "ADD") return [action.task, ...tasks];
  if (action.type == "DELETE")
    return tasks.filter((task) => task.taskId !== action.taskId);

  return tasks;
};
// End taskReducer

/*Create TaskContext*/
interface TaskContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

export const TasksContext = createContext<TaskContextType>(
  {} as TaskContextType
);

export const useTasks = () => useContext(TasksContext);

/*Task Provider*/
interface Props {
  children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
