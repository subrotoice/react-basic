import ListGroup from "./components/ListGroup/ListGroup";
import ChildrenCom from "./components/ChildrenCom";
import Button from "./components/Button/Button";
import Alert from "./components/Alert";
import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";

function App() {
  const items = [
    "Ney York",
    "London",
    "San Frincisco",
    "Pais",
    "Dhaka",
    "Delhi",
  ];
  const [alertVisible, setAlertVisibility] = useState(false);

  const onClick = () => {
    setAlertVisibility(true);
  };

  const selectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <Like
        onClick={() => {
          // onClick is Props
          console.log("Clicked");
        }}
      />
      <BsFillCalendarFill color="red" size="40" />
      {/* here onClose is Props(Argu), not event like onClick */}
      {/* {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Text Comes from App.tsx
        </Alert>
      )}
      <Button onClick={() => setAlertVisibility(true)}>Show</Button> */}
      {/* <Button color="danger" onClick={onClick}> // Here Just call by function
        Show
      </Button> */}
      {/* <ChildrenCom>Hello World2</ChildrenCom> */}
      <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      />
      <Button onClick={() => {}}>Submit</Button>
    </div>
  );
}

export default App;
