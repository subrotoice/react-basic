import React, { useReducer, useState } from "react";
import counterReducer from "./reducers/counterReducer";

const Counter = () => {
  // const [value, setValue]=useState(0);
  const [value, dispatch] = useReducer(counterReducer, 5);
  return (
    <div>
      Counter ({value})
      <button
        className="btn btn-primary mx-1"
        onClick={() => dispatch("INCREMENT")}
      >
        Increment
      </button>
      <button
        className="btn btn-primary mx-1"
        onClick={() => dispatch("RESET")}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
