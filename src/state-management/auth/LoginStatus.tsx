import useCounterStore from "../counter/store";
import useAuthStore from "./store";

const LoginStatus = () => {
  // const { user, dispatch: authDispatch } = useContext(AuthContext);
  const { user, login, logout } = useAuthStore();
  // const { counter } = useCounterStore();
  const counter = useCounterStore((s) => s.counter);
  console.log("From Login Status");

  if (user)
    return (
      <>
        Count: {counter}
        {user}
        <button onClick={() => logout()} className="btn btn-primary mx-1">
          Logout
        </button>
      </>
    );

  return (
    <button
      onClick={() => login("Mr. Biswas")}
      className="btn btn-primary mx-1"
    >
      Login
    </button>
  );
};

export default LoginStatus;
