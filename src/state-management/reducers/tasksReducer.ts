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

export type TaskAction = AddTask | DeleteTask;

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  if (action.type == "ADD") return [action.task, ...tasks];
  if (action.type == "DELETE")
    return tasks.filter((task) => task.taskId !== action.taskId);

  return tasks;
};

export default taskReducer;
