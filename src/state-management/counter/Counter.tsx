import useCounterStore from "./store";

const Counter = () => {
  // const [value, setValue]=useState(0);
  // const [value, dispatch] = useReducer(counterReducer, 5);
  const { counter, increment, reset } = useCounterStore();

  // console.log("Counter Rerender from Counter.tsx");

  return (
    <div>
      Counter ({counter})
      <button className="btn btn-primary mx-1" onClick={() => increment()}>
        Increment
      </button>
      <button className="btn btn-primary mx-1" onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
