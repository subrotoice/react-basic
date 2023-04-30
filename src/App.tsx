import ListGroup from "./components/ListGroup";
import ChildrenCom from "./components/ChildrenCom";
import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

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
      {/* here onClose is Props(Argu), not event like onClick */}
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Text Comes from App.tsx
        </Alert>
      )}
      <Button color="danger" onClick={() => setAlertVisibility(true)}>
        Show
      </Button>
      {/* <Button color="danger" onClick={onClick}> // Here Just call by function
        Show
      </Button> */}
      {/* <ChildrenCom>Hello World2</ChildrenCom> */}
      {/* <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      /> */}
    </div>
  );
}

export default App;
