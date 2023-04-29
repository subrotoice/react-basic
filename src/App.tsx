import ListGroup from "./components/ListGroup";

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
      <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      />
    </div>
  );
}

export default App;
