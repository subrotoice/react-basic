import { useContext } from "react";
import TasksContext from "../contexts/TaskContext";

const useTasks = () => useContext(TasksContext);

export default useTasks;
