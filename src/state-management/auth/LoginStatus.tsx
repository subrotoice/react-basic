import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const LoginStatus = () => {
  const { user, dispatch: authDispatch } = useContext(AuthContext);

  if (user)
    return (
      <>
        {user}
        <button
          onClick={() => authDispatch({ type: "LOGOUT" })}
          className="btn btn-primary mx-1"
        >
          Logout
        </button>
      </>
    );

  return (
    <button
      onClick={() => authDispatch({ type: "LOGIN", userName: "Subroto B." })}
      className="btn btn-primary mx-1"
    >
      Login
    </button>
  );
};

export default LoginStatus;
