import ListGroup from "./components/ListGroup/ListGroup";
import ChildrenCom from "./components/ChildrenCom";
import Button from "./components/Button/Button";
import Alert from "./components/Alert";
import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import Message from "./components/Message";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";

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
  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);

  // const handelClick = () => {
  //   setBug(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  // };
  const onClick = () => {
    setAlertVisibility(true);
  };
  const selectItem = (item: string) => {
    console.log(item);
  };
  return (
    <>
      <ExpandableText maxChars={30}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
        exercitationem tempora illum nemo quae labore praesentium rerum odit
        voluptas. Est, saepe repudiandae nulla totam culpa quod sit error eius
        corrupti fugiat voluptate cupiditate laborum a? Eaque eligendi officiis
        repellat odio libero at id alias nisi voluptatibus hic odit eum sunt
        eius ut inventore quae, magni ipsa. Perferendis tempore at, eligendi
        iste blanditiis laborum excepturi corporis officia cum voluptatibus
        illum impedit voluptas obcaecati eveniet beatae sapiente ex, esse quos
        odit, fuga magni soluta? Ex iste dolorem ullam nesciunt! Dolor laborum
        rerum, modi, aspernatur expedita, dignissimos inventore tempore ad
        reiciendis itaque maiores?
      </ExpandableText>
      {/* <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} /> */}
      {/* <button onClick={handelClick}>Click</button>{" "}
      {bugs.map((bug) => (
        <p key={bug.id}>
          {" "}
          {bug.id} {bug.title} {bug.fixed ? "Fixed" : "New"}{" "}
        </p>
      ))} */}
      {/* <Message />
      <Message />
      <Message /> */}
      {/* <Like
        onClick={() => {
          // onClick is Props
          console.log("Clicked");
        }}
      />
      <BsFillCalendarFill color="red" size="40" /> */}
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
      {/* <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      />
      <Button onClick={() => {}}>Submit</Button> */}
    </>
  );
}

export default App;
