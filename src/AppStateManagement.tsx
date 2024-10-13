import AuthProvider from "./state-management/auth/AuthProvider";
import Counter from "./state-management/counter/Counter";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import { TasksProvider } from "./state-management/tasks";

const AppStateManagement = () => {
  return (
    <AuthProvider>
      <TasksProvider>
        <NavBar />
        <HomePage />
        <Counter />
      </TasksProvider>
    </AuthProvider>
  );
};

export default AppStateManagement;
