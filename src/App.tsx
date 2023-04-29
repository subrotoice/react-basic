import ListGroup from "./components/ListGroup";
import ChildrenCom from "./components/ChildrenCom";

function App() {
  const items = [
    "Ney York",
    "London",
    "San Frincisco",
    "Pais",
    "Dhaka",
    "Delhi",
  ];

  const selectItem = (item) => {
    console.log(item);
  };
  return (
    <div>
      {/* <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      /> */}

      <ChildrenCom>Hello World2</ChildrenCom>
    </div>
  );
}

export default App;
