import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpensesForm from "./components/expense-tracker/components/ExpensesForm";
import "./components/my-style.css";
import "./index.css";

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
  const [selectedCategory, setSelectedCatagory] = useState("");
  const [likeStatus, setLikeStatus] = useState(true);
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 5, category: "Utilities" },
    { id: 2, description: "bbb", amount: 5, category: "Utilities" },
    { id: 3, description: "ccc", amount: 5, category: "Utilities" },
    { id: 4, description: "ddd", amount: 5, category: "Utilities" },
    { id: 5, description: "eee", amount: 10, category: "Groceries" },
    { id: 6, description: "fff", amount: 15, category: "Entertainment" },
    { id: 7, description: "ggg", amount: 1, category: "Utilities" },
  ]);

  // const handelClick = () => {
  //   setBug(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  // };

  const onClick = () => {
    setAlertVisibility(true);
  };

  const selectItem = (item: string) => {
    console.log("Your item name: " + item);
  };

  // it could be keep in a State in stade of local variable, but it completely unnecessary, because we get it form calculation
  const visibleExpenses =
    selectedCategory !== ""
      ? expenses.filter((e) => e.category === selectedCategory)
      : expenses;
  const PersonFunction = (data: string) => {
    console.log(data);
  };

  const onClickFunction = (data: string) => {
    console.log("onClickFunction: " + data);
  };

  const closeAlert = (data: string) => {
    setAlertVisibility(false);
    console.log(data);
  };

  const clickHandler = (e: number) => {
    console.log(e);
    setExpenses(expenses.filter((expense) => expense.id !== e));
  };
  const troggle = () => {
    setLikeStatus(!likeStatus);
  };

  return (
    <>
      {likeStatus == false ? (
        <AiOutlineHeart color="green" size="40" onClick={troggle} />
      ) : (
        <AiFillHeart color="green" size="40" onClick={troggle} />
      )}

      <div className="mb-5">
        <ExpensesForm
          onSubmit={(newExpense) => {
            setExpenses([
              { ...newExpense, id: expenses.length + 1 },
              ...expenses,
            ]);
          }}
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCatagory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((e) => e.id != id));
        }}
      />
      {/* <Form /> */}
      {/* <ExpandableText maxChars={30}>
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
      </ExpandableText> */}
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
        <Alert onClose={closeAlert} color="danger">
          This is a primary alert—check it out!
        </Alert>
      )}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setAlertVisibility(true)}
      >
        Show
      </button> */}
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
      /> */}
      {/* <ListGroup
        items={items}
        heading="Citis"
        selectItemFunction={selectItem}
      />
      <Person name="Shipi" country="USA" onClickTest={PersonFunction}>
        Subroto
      </Person>
      <Button onClick={onClickFunction}>Submit</Button>
      <Button onClick={() => {}}>Submit</Button> */}
    </>
  );
}

export default App;
