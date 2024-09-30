# TypeScript and Vite and React Basic

[Vercel Deploy](https://react-crud-subroto.vercel.app) <br>
[ReactJs Gist Subroto](https://gist.github.com/subrotoice/98eb2fcbcef23c733cd36e0575c2e37c) <br>
[Lucy Theme](https://vscodethemes.com/e/juliettepretot.lucy-vscode/lucy?language=javascript)

```javascript
// main.tsx change component to see different implentation.
<React.StrictMode>
  <AppFetchingData />
  {/* <App2 />
  <App /> */}
</React.StrictMode>
```

# Ch-1: Butliding Component - React Basic

**1.1 TypeScript Interface illustration using Button**<br />

1. Interface: Saying types of porps element, it outside the component function<br />
2. Props: Passing data from parent to child using <br />
3. Callback Function: Passing data from child to Parent

Example 1: Parent to child data transer

```javascript
// ABC (Without typescript) | Observation: before retunr: handel Data, Inside return: handel Markeup
// App.js
<Person name="Goutom">Subroto</Person>; // Person.tsx | name=goutom, children=Subroto passing

// Person.js
const Person = ({ name, children }) => {
  // App.tsx
  return (
    <div>
      <h1>
        {name} and {children} // or props.name, props.children
      </h1>
    </div>
  );
};
```

Example 2: Function defination comes from App.js but argument pass from component

```jsx
// App.js
const selectItem = (item) => {
  console.log(item);
};

return ( // onClick event e click korle onClick function props call hoy.
  <div>
    <Button color="Primary" onClick={selectItem}> { // color="Primary222", typescript error, but work }
      It is Children(Button)
    </Button>
  </div>
);

// Button.js
interface Props { // TypeScript Interface: To define Shape of Props | Outside Button function
  children: string;
  color?: "Primary" | "Sedondary" | "Danger"; // ? For Optional, Outside this value you can not set
  selectItem: (data: string) => void;
}

const Button = ({ children, onClick, color = "Primary"  }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      // className={[styles.btn, styles.btnPrimary, "btn btn-" + color].join(" ")} // styles is css module
      onClick={() => selectItem(children)} // Function defination comes from App.js but argument pass from here to App.js
    >
      {children}
    </button>
  );
};
```

Example 3 : Child to Parent Data transfer (Very Important)

```jsx
// App.js
// In one line arraw function defination
<Person name="Shipi" country="USA" onClickTest={(name) => console.log(name)}>
  Subroto
</Person>;
const PersonFunction = (data: string) => {
  console.log("PersonFunction " + data);
};

// Passing functino reference
<Person name="Shipi" country="USA" onClickTest={PersonFunction}>
  Subroto
</Person>;

// 1. Function Defination - Argument Yes
// 2. Component Use - Argument No
// 3. Function Call from Child Component - Argument Yes

// Person.js
interface Props {
  name: string;
  children: string;
  country?: "Bangladesh" | "India" | "USA";
  onClickTest: (data: string) => void;
}
<button onClick={() => onClickTest("Suboto Biswas")}>Click Here</button>;
```

Example 4 : Another way of passing props

```jsx
// Both are same
<MyImage id={3} name="MyName" />
// Outer bracket {} for writing js cdoe in jsx inner is actual object
<MyImage {...{ id: 3, name: "myName" }} />

// MyImage.tsx
import React from "react";

interface Props {
  id: number;
  name: string;
}

const MyImage = (props: Props) => {
  return <div>MyImage {props.name}</div>;
};

export default MyImage;
```

NB: onClick react event, onClickTest Functional Props, PersonFunction is function name; Passing data using arraw function. if we use onClickTest("subrotoBiswas") function will directly call so use arraw function

## Share state between two component

**If you share data between two state then data lifted up to parent and then send to anoter children**<br>
Alert: here onClose is Props(Argu), not event like onClick

```javascript
// App.js,  here onClose is Props(Argu), not event like onClick
const closeAlert = (data: string) => {
  setAlertVisibility(false);
  console.log(data);
};

{
  alertVisible && ( // if alertVisibile is true then show
    <Alert onClose={closeAlert} color="danger"> // Passing onClose, color and Children to Alert.tsx
      This is a primary alert—check it out!
    </Alert> // here onClose is functional Props, closeAlert is function name | Here no need to pass argument, arg is only function defination and Children Component
  );
}

// Alert.js
interface Props {
  children: ReactNode; // chidren is ReactNode type
  color?: "primary" | "success" | "danger";
  onClose: () => void;
}

const Alert = ({ children, onClose, color = "primary" }: Props) => {
  return (
    <div>
      <div className={`alert alert-${color} alert-dismissible`} role="alert">
        {children}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => onClose("Subroto Close")} // Passing arg from child
        ></button>
      </div>
    </div>
  );
```

**List Group: Above two concept here with combination (Passing data either way Parent to child and chield to Parent)**

```javascript
// App.tsx
const items = ["Ney York", "London", "San Frincisco", "Pais", "Dhaka", "Delhi"];
const selectItemFunction = (item: string, index: number) => {
  console.log(index + ": Your item name: " + item);
};
<ListGroup
  items={items}
  heading="Cities"
  selectItemProps={selectItemFunction}
/>;

// ListGroup.tsx
import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  selectItemFunctionalProps: (item: string, index: number) => void;
}

function ListGroup(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handelClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{props.heading}</h1>
      <ul className="list-group">
        {props.items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => {
              props.selectItemFunctionalProps(item, index);
              setSelectedIndex(index);
            }}
          >
            {index + ": " + item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

**List Group: Filter, Delete illustration**

```javascript
const [expenses, setExpenses] = useState([
  { id: 1, description: "aaa", amount: 5, category: "Utilities" },
  { id: 2, description: "bbb", amount: 5, category: "Goods" },
  { id: 3, description: "ccc", amount: 5, category: "Entertainment" },
]);

// Filter: Without funciton
{
  expenses.map((e) => (
    <button
      onClick={() =>
        setExpenses(expenses.filter((expense) => expense.id !== e.id))
      }
    >
      {e.id}
    </button>
  ));
}

// Filter: With funciton
const clickHandler = (e: number) => {
  console.log(e);
  setExpenses(expenses.filter((expense) => expense.id !== e));
};

{
  expenses.map((e) => (
    <button onClick={() => clickHandler(e.id)}>{e.id}</button>
  ));
}
```

**Like implementaion with react icon**

```javascript
const troggle = () => {
  setLikeStatus(!likeStatus);
};
{
  likeStatus == false ? (
    <AiOutlineHeart color="green" size="40" onClick={troggle} />
  ) : (
    <AiFillHeart color="green" size="40" onClick={troggle} />
  );
}
```

# Ch-4: Styling Components -----

**4.1 Vanilla CSS**

```javascript
// ListGroup.tsx
import "./ListGroup.css"; // import "./css/ListGroup.css";

// ListGroup.css
.list-group {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

Conditional CSS:

```javascript
className={`list-group-item ${selectedUser == user.id && "active"}`}
```

**4.2 CSS Modules**

```css
// App.tsx | .listGroup is an object
import styles from "./ListGroup.module.css";
<ul className={styles.listGroup}>
<ul className={[styles.listGroup, styles.container].join(" ")}> // Apply Multiple class
<div className={`${styles.container} ${isImportant && styles.important}`}>Content goes here</div> // Dynamic class names with CSS Modules

// ListGroup.module.css | module spelling should be careful | .listGroup is an object
.listGroup {
  list-style: none;
  margin: 0;
  padding: 0;
}
.container {
  background-color: bisque;
}

```

**4.3 Inline CSS**

```javascript
<ul style={{ backgroundColor: "red", color: "white" }}> // inside {} js object
<p style={{ backgroundColor: "#e0e0e0", color: "white" }}>We are good</p>

const dynamicStyle = {
  backgroundColor: isImportant ? 'red' : 'lightgray',
  padding: '10px',
  border: '1px solid darkgray',
};
<div style={dynamicStyle}>
  <p style={{ color: isImportant ? "Green" : "black", fontSize: "16px" }}>Dynamic styles!</p>
</div>

// Different property in React: backgroundColor, color, fontSize, padding, margin, border, borderRadius, textAlign, fontWeight, textTransform, textDecoration, boxShadow, display, flexDirection, justifyContent, alignItems, overflow, opacity, transition, zIndex
```

**4.4 Adding Icons** <br />
In terminal run

```bash
npm i react-icons@4.7.1
```

```javascript
// Bs: means Bootstrap, https://react-icons.github.io/react-icons
import { BsFillCalendarFill } from "react-icons/bs";
<BsFillCalendarFill />;
<BsFillCalendarFill color="red" size="40" />;
```

# Ch-5: Managing Component State | React-State Good Practice

```javascript
// To avoid unnecessary rendring. It's better to group related state variable inside an object
const [firsName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const [person, setPerson] = useState({
  firsName: "",
  lastName: "",
});
```

**Updating Object State**

```javascript
const [drink, setDrink] = useState({
  title: "Ram",
  price: 5,
});
const handelClick = () => {
  // in this funcion differnet option is being illustrated
  // System 1
  const newDrink = {
    title: "Ram",
    price: 6,
  };
  // System 2: Spread ... operator Making new object so { }, Copy all property of an object and change(because same poperty) some part, it my be combine if new poperty, same for Array
  const newDrink = {
    ...drink,
    price: 8,
  };
  setDrink(newDrink);
  // System 3: Best
  setDrink({ ...drink, price: 9 });
};

// Updating Nested Object
const [drink, setDrink] = useState({
  title: "Ram",
  price: 5,
  alcoholBottol: {
    nip: 250,
    pide: 500,
    full: 750,
  },
});
const handelClick = () => {
  setDrink({ ...drink, alcoholBottol: { ...drink.alcoholBottol, full: 1000 } });
};
```

**Updating Array**

```javascript
const [mood, setMood] = useState(["Happy", "Angry"]);
const handelClick = () => {
  // Add
  setMood([...mood, "Joy"]);
  // Delete
  setMood(mood.filter((mod) => mood !== "Happy"));
  // Update: If mod!=Happy return mod itself
  setMood(mood.map((mod) => (mood === "Happy" ? "Happyness" : mood)));
};

<button onClick={handelClick}>Click</button> {mod.join(" ")}
```

**Best Practice: Updating Array of Objects**

```javascript
const [bugs, setBug] = useState([
  { id: 1, title: "Bug 1", fixed: false },
  { id: 2, title: "Bug 2", fixed: false },
]);
const handelClick = () => {
  setBug(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
};
<button onClick={handelClick}>Click</button>{" "}
{bugs.map((bug) => (<p key={bug.id}> {bug.id} {bug.title} {bug.fixed ? "Fixed" : "New"} </p>))}
```

**Sharing State between Components**

```javascript
// App.js
const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);
const onAddFunction = (item: string) => {
  setCartItems([...cartItems, item]);
  console.log(item);
};
<NavBar cartItemsCount={cartItems.length} />
<Cart cartItems={cartItems} onClear={() => setCartItems([])} onAdd={onAddFunction} /> // No argument here

// NavBar.tsx
interface Props {
  cartItemsCount: number;
}
const NavBar = ({ cartItemsCount }: Props) => {
  return <>Items: {cartItemsCount}</>;
};

// Cart.tsx
interface Props {
  cartItems: string[];
  onClear: () => void;
}
const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      {cartItems.map((cartItem, indexa) => (
        <p key={indexa}>{cartItem}</p>
      ))}
      <button onClick={onClear}>Clear</button>
      <button className="btn btn-primary" onClick={() => props.onAdd("Product 3")}
      >
    </>
  );
};
```

**Expandable Text Project**

```javascript
// **Expandable**
interface Props {
  children: string;
  maxChars?: number;
}

// Very smart coding
const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  const [showMore, setShowMore] = useState(true);
  // if less character then return direct without button
  if (children.length < maxChars) return <>{children}</>;
  const text = showMore ? children.slice(0, maxChars) + "..." : children; // Finialize text first, if we keep text in state then there were unnecessary re-rener
  return (
    <div>
      {text}
      <button
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {showMore ? "More" : "Less"} //show less or more on state
      </button>
    </div>
  );
};
// App.js
<ExpandableText maxChars={30}>
  Lorem ipsum, dolor sit amet consectet
</ExpandableText>;
```

# Ch-6: Building Forms

**Form value may collected in Two way.**  
**Way 1: useRef Hook**

```javascript
const Form = () => {
  // HTMLInputElement for ts, useRef could be reference any thing ie. button, input
  const nameRaf = useRef < HTMLInputElement > null; // null common practice
  const ageRaf = useRef < HTMLInputElement > null;
  const person = { name: "", age: 0 };
  // event type FormEvent and it need to import
  const submitHandeler = (event: FormEvent) => {
    event.preventDefault();
    // Think in a way: just input er reference ene ekhane kaj korce
    if (nameRaf.current !== null) person.name = nameRaf.current.value;
    // parseInt convet string to integer: typeScript
    if (ageRaf.current !== null) person.age = parseInt(ageRaf.current.value);
    console.log(person); // Sending data server need object
  };
  return (
    <form onSubmit={submitHandeler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          ref={nameRaf}
          type="text"
          name="name"
          id="name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          ref={ageRaf}
          type="number"
          name="age"
          id="age"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
```

**Way 2: useState Hook, Normally people do, onChange=reRender**

```javascript
const Form = () => {
  // console.log("Render"); Lots of rerender needed, Most of the cases not needed, if application big then create problem
  const [person, setPerson] = useState({ name: "", age: "" }); // here age:0, it keep input field always 0
  // event type FormEvent and it need to import
  const submitHandeler = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };
  return (
    <form onSubmit={submitHandeler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          value={person.name}
          type="text"
          name="name"
          id="name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(event) => {
            setPerson({ ...person, age: event.target.value });
          }}
          value={person.age}
          type="number"
          name="age"
          id="age"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
```

**React Hook Form: It use useRef so no rerendering**  
Step1: Install, <br>
Step2: const { register, handleSubmit } = useForm(), // Destructure react hook functions from react form hook  
Step3: Input tag should look like this: <input {...register("name")} /><br>
[Watch Video](https://members.codewithmosh.com/courses/ultimate-react-part1-1/lectures/45915810)
[TypeScript Data type get] (https://prnt.sc/WsBn3-rT06cS)

```bash
npm i react-hook-form@7.43
```

```javascript
const Form = () => {
  const { register, handleSubmit } = useForm(); // destructring form, const from = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          type="number"
          id="age"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
```

**Data Validation (React Hook Form)**
Step1: Previous Step + const { register, handleSubmit, formState: { errors }} = useForm<FormData>();  
Step2: Input tag should look like this: <input {...register("name", { required: true, minLength: 3 })}/><br>
Step3: {errors.name?.type === "required" && (HTML Tag)} // Display error

```javascript
interface FormData {
  // here interface create for autoComplete, you may ignore: https://members.codewithmosh.com/courses/ultimate-react-part1-1/lectures/45915813, 4:55
  name: string;
  age: number;
}
const Form = () => {
  //   const { register, handleSubmit, formState } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors }, // Nested destrusting
  } = useForm<FormData>();
  console.log(errors); // if error occured then onSubmit kaj korbe na ty outside onSubmit e error dekhano hoyeche
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          type="text"
          name="name"
          id="name"
          className="form-control"
        />
        {errors.name?.type === "required" && ( // ? is optional chaining in JavaScript, if there is not name error in that time we try to access type then might be an error
          <p className="text-danger">Name field must be required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">Name field need minimum 3 characters</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          type="number"
          name="age"
          id="age"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
```

**[Most Difficult] Schema based Validation with Zod (All validation rule in one Place)**
Zod is a TypeScript-first schema declaration and validation library. It's commonly used for defining and validating data shapes, such as API payloads, form data, or any structured data in your application.
Resolver is schema based validation library for Zod
[Watch-Video] (https://members.codewithmosh.com/courses/ultimate-react-part1/lectures/45915806)
[Zod](https://zod.dev)

```bash
npm i zod@3.20.6
npm i @hookform/resolvers@2.9.11
```

**Code Structure: React-hook-form, Zod, ZodResolver**

```javascript
// Code Structure Start
//Step 1: Importing library
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Step2: Interface block start
// Schema Defination and Interface(type) extract
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount field must be required." })
    .min(0.01, { message: "Minimum amount is .01" })
    .max(10000, { message: "Maximum amount is 10000" }),
  category: z.string(),
});
type ExpensesFormDataTest = z.infer<typeof schema>; //type extracting
// Interface block End

//Step3: send data from child to parent using Function
interface Props {
  onAdd: (data: ExpensesFormDataTest) => void;
}

// Step 4: Combain React hook form with Zod using zodRelosver
const ExpenseFormTest = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm < ExpensesFormDataTest > { resolver: zodResolver(schema) };

  const onSubmit = (data: ExpensesFormDataTest) => {
    // console.log(data);
    onAdd(data);
  };
  // Setp 5: Final form and {...register()}
  return (
    <>
      <form className="my-3" action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("description")} // no need to use name=""
        />
        {errors.description && <p>{errors.description.message}</p>}
        <button
          disabled={!isValid} // Disable
        >
          Add
        </button>
      </form>
    </>
  );
};
// Structure End

// Final Code
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field must be required" })
    .min(18, { message: "Age must be at least 18" }),
});
// extract the inferred type: type is similar like interface
type FormData = z.infer<typeof schema>; // creating interface type here

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Nested destrusting, isValid for submit button enable and disable
  } = useForm < FormData > { resolver: zodResolver(schema) }; //

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          name="name"
          id="name"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          name="age"
          id="age"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
```

**Expense Tracker Project: Using Zod, useFrom, zodResolver (upper 3 combination)**

```javascript
// App.js
function App() {
  const [selectedCategory, setSelectedCatagory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 5, category: "Utilities" },
    { id: 2, description: "bbb", amount: 5, category: "Groceries" },
    { id: 3, description: "ccc", amount: 5, category: "Utilities" },
    { id: 4, description: "ddd", amount: 5, category: "Utilities" },
    { id: 5, description: "eee", amount: 10, category: "Groceries" },
    { id: 6, description: "fff", amount: 15, category: "Entertainment" },
    { id: 7, description: "ggg", amount: 1, category: "Utilities" },
  ]);

  // It could be keep in a State in stade of local variable, but it completely unnecessary, because we get it form calculation
  const visibleExpenses =
    selectedCategory !== ""
      ? expenses.filter((e) => e.category === selectedCategory)
      : expenses;
  const PersonFunction = (data: string) => {
    console.log(data);
  };

  // Also you can use this: add expense using last id decending order
  const onAdd = (expense: {
    // interface type
    description: string,
    amount: number,
    category: string,
  }) => {
    setExpenses([{ id: expenses[0].id + 1, ...expense }, ...expenses]);
  };
}
return (
  <>
    <div className="mb-5">
      <ExpensesForm
        onSubmit={(newExpense) => {
          // first array of object, then add id to from input
          setExpenses([
            ...expenses,
            { ...newExpense, id: expenses.length + 1 },
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
  </>
);

// ExpenseList.tsx
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}
const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              $
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

// ExpensesForm.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  // Think in this way: zod is nothing but inerface decleartion, & central control
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(100),
  amount: z
    .number({ invalid_type_error: "Age field must be required" })
    .min(0.01)
    .max(100000),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Catagory is required",
    }), // Returning object literals using the concise body syntax (params) => { object: literal } does not work as expected.
  }), //typescript problem, in app.js need ta add as const when declearing categories
});

type ExpensesFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpensesFormData) => void;
}

const ExpensesForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm < ExpensesFormData > { resolver: zodResolver(schema) };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <div className="mb-3">
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

// ExpenseFilter.tsx
import categories from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <div>
      <select
        className="form-select mb-3"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};
```

# Ch-7: Connecting to the Backend

Fetching Data useing fetch(), axios

```bash
npm i axios@1.3.4
```

### Fetching Data from server.

- Method 1: Fetch()
- Method 2: Axios

```jsx
import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}
const AppFetchingData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  // Method1: Using Browser Fetch API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []); // [] Only first time run

  // Method2: Using Axios
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/xusers")
      .then((res) => setUsers(res.data)) // Success or No Error
      .catch((err) => setError(err.message)); // Fail or Error
  }, []);


  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Axios syntax - CRUD in Short

```jsx
// C: Add Users using Axios
axios
  .post("https://jsonplaceholder.typicode.com/users/", newUser) // Base_URL + Endpoing + Payload(newUser)
  .then((res) => { // Success
    console.log(res);
  })
  .catch((err) => { // Failed
    console.log(err);
  });

// R: Read
axios
  .get("https://jsonplaceholder.typicode.com/users", {
    signal: controller.signal,
  }) // return a Promise
  .then((res) => { Success })
  .catch((err) => { Failed });

// U: Update
axios
  .patch("https://jsonplaceholder.typicode.com/users/" + user.id, updatedUser)
  .catch((err) => { Handel Only Filed If you do not want to handel success });

// D: Delete User using Axios
axios.delete("https://jsonplaceholder.typicode.com/users/" + user.id).catch((err) => {});
```

## Cancelling Fetch request & Loading

- Return of useEffect is clean up function
  [Cancelling a Fetch Request](https://members.codewithmosh.com/courses/ultimate-react-part1-1/lectures/45915908)
- useEffect normally for fetching(axios.get()) data. create(), delete(), update()

```jsx
import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      }) // Success or No Error
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      }); // Fail or Error

    return () => controller.abort(); // Step-4; Clean Up function
  }, []);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```

### CRUD using axios for User

- Store all users in another variable before delete. Deleting Data, if error get back to original data
- patch/put() you can use depending on backend
- Need useEffect to control fetch. First time data loda using useEffect

```jsx
import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Read/View User. Need useEffect to control fetch. First time data loda using useEffect
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      }) // Success or No Error
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      }); // Fail or Error

    return () => controller.abort(); // Step-4; Clean Up function
  }, []);

  // Delete User (We need to handel any good response so there is no then() block)
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  // adding User (res: destructiring and renaming)
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users])) //res: destructiring and renaming, Increase readability
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  // Update User (We need to handel any good response so there is no then() block)
  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-2" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {`${user.id}. ${user.name}`}
            <div className="">
              <button
                onClick={() => updateUser(user)}
                className="btn btn-outline-danger my-1 mx-1"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger my-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```

# Generic Approace

At this point we have all functionality for CRUD. Now we reduce code duplication and increase reusuability of the code.

1. Api Client (axios config)
2. User Service (endpoint)
3. HTTP Serivce (User Service, Post Service - CRUD)
4. Create Hook

## Label 1: Api Client - Asios Instance (apiClient - Setting axios configaration object)

[axious.create()](https://axios-http.com/docs/instance) - Axios Config

```jsx
// Basic Syntax
import axios from "axios";

// Create an instance(object) of Axios with custom configuration
const apiInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_access_token",
  },
});

// Now you can use apiInstance to make requests with the specified configuration
apiInstance
  .get("/users")
  .then((res) => {})
  .catch((err) => {});
```

## User and apiClient Example

```jsx
// user.tsx (Using apiClient)
import apiClient, { CanceledError } from "../services/api-client";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete("/users/" + user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]);
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-2" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {`${user.id}. ${user.name}`}
            <div className="">
              <button
                onClick={() => updateUser(user)}
                className="btn btn-outline-danger my-1 mx-1"
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger my-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

// services/api-client.ts (when there is markup there is tsx extension)
import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  //   headers: {
  //     'api-key': '...' // Sometimes needed
  //   }
});

export { CanceledError };
```

axios.create() helps to avoid redundancy in your code and makes it easier to manage and update the configuration globally.<br>

## Label 2: myUser-service.ts/post-service.ts

```jsx
// user.tsx (import is based on file name "services/myUser-service" not export element)
import { useState, useEffect } from "react";
import myUserService, { User } from "../services/myUser-service";
import { CanceledError } from "axios";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = myUserService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    myUserService.deleteUser(user).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]);

    myUserService
      .addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    myUserService.updateUser(updatedUser, user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    // Same as before
  );
};

export default Users;

// myUser-service.ts
import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteUser(user: User) {
    return apiClient.delete("/users/" + user.id);
  }

  addUser(newUser: User) {
    return apiClient.post("/users", newUser);
  }

  updateUser(updatedUser: User, userId: number) {
    return apiClient.patch("/users/" + userId, updatedUser);
  }
}

export default new UserService();
```

## Lable 3: Although myUserService instance use here but it use 'export default create("/users")' from myUserService.ts

```jsx
// Users.tsx
import { useState, useEffect } from "react";
import myUserService, { User } from "../services/myUser-service";
import { CanceledError } from "axios";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = myUserService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    myUserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]);

    myUserService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    myUserService.update(updatedUser, user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    // Same as upper
  );
};

// myUser-service.ts
// create() is a function which is used to create new object passing endpoint from here
import create from "./http-service";

// just add export to use multiple place
export interface User {
  id: number;
  name: string;
}

export default create("/users"); // function call and export, Only place to provide endpoint

// http-service.ts
// all are generic here. at the end we have create() arraow function
import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endPoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endPoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endPoint, entity);
  }

  update<T extends Entity>(entity: T, id: number) {
    return apiClient.patch(this.endPoint + "/" + id, entity);
  }
}

// export default new HttpService(); Instade of we can use this
const create = (endPoint: string) => new HttpService(endPoint);
export default create;
```

## Creating basic hook ( Hook just a function )

A custom hook is a JavaScript function that utilizes React's built-in hooks (such as useState, useEffect, useContext, etc.) to encapsulate and share stateful logic between components. Custom hooks allow you to extract reusable logic from components and compose it into custom hooks that can be reused across multiple components. <br>
Hook have two think

1. Export Function
2. Return statement of that function

BASIC Version

```jsx
// DataFetch.tsx
import useFetch from "./useFetch";

const DataFetch = () => {
  const url = "https://dummyjson.com/posts";
  const urlExtra = useFetch(url); // hook call

  return (
    <div>
      <h1>{urlExtra}</h1>
    </div>
  );
};

// useFetch.ts (hook)
const useFetch = (url: string) => {
  console.log(url); // execute
  return url + "/extra"; // return
};

export default useFetch;
```

ADVANCE Version

```jsx
// DataFetch.tsx
import useFetch from "./useFetch";

const DataFetch = () => {
  const url = "https://dummyjson.com/posts";
  const { data, error, isLoading } = useFetch(url);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data</h1>
      {data.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default DataFetch;

// useFetch.ts (fetch version) return { data }
const useFetch = (url: string) => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData(json.posts);
      });
  }, [url]);
  return { data };
};

// useFetch.ts (axios version) return { data, error, isLoading }
import axios from "axios";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FetchPostResponse {
  total: number;
  posts: Post[];
}

const useFetch = (url: string) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get<FetchPostResponse>(url)
      .then((res) => {
        setData(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  return { data, error, isLoading };   // hook is just a function, have a return values, Reuren state variable so that it can reuse
};
export default useFetch;
```

## Creating a Custom Data Fetching Hook useUsers.ts (Fetch User list)

- At this point everything is alright. But a situation where another component need to fetch list of users. Then we have to declear 3 same state variable ie. users, error, isLoading.
- Custom hook is used to share functionality accross different components.
- Here useUsers.ts is just a regular module. Here we have funtion useUsers() and export that function
- Observation: Hook normally component function er start theke return er ager js code process korar jonno alada function hisabe use hoy. So Copy from Users component and keep it in useUsers.ts

- We can'n copy event handeler like addUser, deleteUser. Because event handeler is specific to this component.

```jsx
// Basic Structure of Hook. 1. Arrow Function, 2. Return Some state valriable, 3. Export Statement
const useUsers = () => {
  // Some Codding
  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
```

```jsx
// Users.tsx
import useUsers from "../hooks/useUsers";
import myUserService, { User } from "../services/myUser-service";

const Users = () => {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  // these 3 eventhandeler remain same. Nothing to do with hook
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    myUserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };


  const addUser
  const updateUser

  return (
    // Same Before
  );
};

export default Users;

// hooks/useUsers.ts (Export Function, Return statement of that function)
// This codding is absolutly fine no need to
// Custom hook: Hook just a function, Return a object
import { useState, useEffect } from "react";
import myUserService from "../services/myUser-service";
import { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = myUserService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;

// These 3 file is same as upper code
// api-client.ts
// user-service.ts
// http-service.ts
```

In summary

1. App.js->delete(3) Kaj ses
   🠋
2. user-service/post-service->Only endpoint provide kore
   🠋
3. http-service->handel all types CRUD, Main work done here
   🠋
4. api-client->contain api configaration object
   🠋
5. axios->finally execute to server

# Part 2: React Intermidate Topics

## By the end of the lesson what you will have

- Fetching and updating data with React Query
- All about reducers, context, and providers
- Managing application state with Zustand
- Routing with React Router

## - React-query installation

- Install react-query (useQuery(Read) and useMutation(Create, U, D) are two main hook)
- Import QueryClient, QueryClientProvider
- React query is not for fetching data, Je data fetch kore take order kore kokhon new data fetch korte hobe, data catch kivabe korte hobe.
- React Query is a library for managing and caching data in React applications. It provides a set of hooks and utilities to simplify the fetching, caching, and updating of data in your components.
- useQuery: hook handles data fetching, caching, and re-fetching logic automatically
- Query Keys: Queries are identified by keys, which are typically strings or arrays. The key is used to cache and reference the data associated with a particular query.
- Mutations: React Query also provides a useMutation hook for handling data mutations (create, update, delete operations). It simplifies the process of sending data to a server and updating the cache accordingly.

- Background Data Refetching: React Query supports automatic background data refetching, helping to keep data up-to-date without requiring manual triggers.

- Optimistic Updates: The library allows for optimistic updates, where UI is updated optimistically before the server responds to a mutation.

- Pagination and Infinite Loading: React Query provides built-in support for handling paginated data and implementing infinite scrolling.

- Query Devtools: React Query comes with a set of developer tools (Devtools) that can be used to inspect and debug the state of queries in your application. <br >

useQuery: This hook is used for fetching data from a server or any other data source. It provides a declarative way to fetch and cache data, with built-in features like caching, background refetching, and automatic stale data management. <br >

```jsx
import { useQuery } from "react-query";
const { data, isLoading, isError } = useQuery("todos", fetchTodos);

// Complete features
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    throwOnError,
  },
  queryClient
);
```

useMutation: As mentioned earlier, useMutation is used for handling mutations, such as creating, updating, or deleting data on the server. <br >

```jsx
import { useMutation } from "react-query";
const mutation = useMutation(createTodo);
```

useQueryClient: This hook can be used to manually interact with the cache or trigger queries programmatically. <br >

```jsx
import { useQueryClient } from "react-query";
const queryClient = useQueryClient();
queryClient.setQueryData("key", newData); // Updating the data in the cache directly
```

useInfiniteQuery: This hook is used for paginated data fetching. It's similar to useQuery, but it's designed for fetching data in chunks or pages. <br >

```jsx
import { useInfiniteQuery } from "react-query";
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery("todos", fetchTodos, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
```

```bash
npm i @tanstack/react-query@4.28
```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
// This line added
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient(); // this line added

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> <!--This line added-->
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

Query Keys: Queries are identified by keys, which are typically strings or arrays. The key is used to cache and reference the data associated with a particular query.

## - Fetching Data - useQuery hook

- Auto refresh, Caching

```jsx
// TodoList.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

    // this code is only for react query
  const { data: todos, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (error) return <p>{error}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

```

## - Handling Errors

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://xjsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data: todos, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};
```

## - Loading

```jsx
.................
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading....</p>;

  if (error) return <p>{error.message}</p>;

```

## - Creating a custom query hook

```jsx
// TodoList.tsx
  const { data: todos, error, isLoading } = useTodos();

// useTodos.ts (Hook)
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery<Todo[], Error>({ // return{ data, error, isLoading }
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
```

## - React Query Dev Tools

```bash
npm i @tanstack/react-query-devtools@4.28
```

```jsx
// main.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools />
</QueryClientProvider>;
```

## - Customizing Query Setting

```jsx
- Refetching: IF data is stale(old) data, react query is attempt to fetch new data form backend while at the same time returning the stale(বাসি) data from cache data, when new data come component rerender
// main.tsx (Often need to customized is staleTime)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4,
      cacheTime: 300_000, // 5m (If no observer or no component using this cache then invalide)
      staleTime: 10 * 1000, // 10s (How long data is considired fresh, next time react query refetch data)
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // go offline and back onlinbe
      refetchOnMount: false,
    },
  },
});

// useTodos.ts | You can use here also
useQuery<Todo[], Error>({
    // return{ data, error, isLoading }
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 10 * 1000, // 10s
  });
```

## - Parameterized Query: Dynamic query key (users/1/posts filter post by user)

- Query Keys: Queries are identified by keys, which are typically strings or arrays. The key is used to cache and reference the data associated with a particular query.

```jsx
  return useQuery<Post[], Error>({
    queryKey: ["users", userId, "posts"], // It is very similar dependency array of useEffect, when any value change query will reexecuted
    queryKey: userId ? ["users", userId, "posts"] : ["posts"], // if userId is truty then ...
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000, // 1m
  });
```

## - Paginated queries

- keepPreviousData: true: During the loading state (isLoading is true), the component can render the UI using the previous data, preventing a sudden change in the displayed content.
- Keep data of current page instade of showing loading when new data come replace smothly

```jsx
// PostList.tsx
import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  // isFetching: is more conviniyent
  const { data: posts, error, isFetching, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary mt-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary mt-3 ms-3"
      >
        {isFetching ? "Loading" : "Next"}
      </button>
    </>
  );
};

// usePosts.ts (keepPreviousData: true, // Keep data of current page instade of showing loading when new data come replace smothly)
// the component can render the UI using the previous(current data) data, preventing a sudden change in the displayed content.
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: { // jsonplaceholder api pattern
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, // 1m
    keepPreviousData: true, // Keep data of current page instade of showing loading
  });
export default usePosts;
```

## - Infinite queries "useInfiniteQuery" Hook (Littl bit tricky and difficult)

- When click on
  1.fetchNextPage() though a button click, then
  2.getNextPageParam() function calculate next page param pass to
  3.queryFn() argument

```jsx
// PostList.tsx
import usePosts from "./hooks/usePosts";
import React from "react";

const PostList = () => {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="btn btn-primary mt-3 ms-3"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};
```

```jsx
// usePosts.ts
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) => //receive this form getNextPageParam()
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, // 1m
    keepPreviousData: true, // Keep data of current page instade of showing loading
    getNextPageParam: (lastPage, allPages) => {
      // 1->2   https://prnt.sc/0jev3TFIYJ1K  \ Array[Post[] Post[] Post[]]  array.length 3
      return lastPage.length > 0 ? allPages.length + 1 : undefined; // it will pass to queryFn: ({pageParam}) as pageParam
    },
  });
export default usePosts;
```

## - Mutating Data (React Query - Part 2)

The useMutation hook is used for handling mutations, which are operations that modify data on the server, such as creating, updating, or deleting resources. <br>

(After mutation (add to backend(api) we can invalidate cache and refetch or add data directly to cache)) <br >

Updating Cached Data: Then, you can use the setQueryData function to update the cached data for a specific query: <br>

- mutate(itemObject) pass argument to mutationFn()

```jsx
// theory
const addTodo = useMutation<Todo, Error, Todo>({
  mutationFn: (todo: Todo) => // step 2: mutationFn(), received form  mutate() function
    axios
      .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
      .then((res) => res.data),
  onSuccess: (savedTodo, newTodo) => {  // step 3: onMutate, onSuccess, onError, onSettled, and optimisticUpdate. These options allow you to customize mutation behavior, handle side effects, and provide a better user experience.
    queryClient.setQueryData<Todo[]>(["todos"], (todos) => {
      return [savedTodo, ...(todos || [])];
    });
  },
});

addTodo.mutate({ // Step 1: Pass object to mutationFn()
  id: 0,
  title: ref.current?.value,
  completed: false,
  userId: 1,
});
```

```jsx
// TodoForm.tsx (After mutation (add to backend(api) we can invalidate cache and refetch or add data directly to cache))
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // callBack(), both send from server, savedTodo is server respons, newTodo object sent form client
      // Approach 1: Invalidating the cache and refetch
      // queryClient.invalidateQueries({ // this will not work because it is fake api
      //   queryKey: ["todos"],
      // });

      // Approach 2: Updating the data in the cache directly
      // queryClient.setQueryData("key", newData);
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      className="row mb-3"
      onSubmit={(event) => {
        event.preventDefault();

        if (ref.current && ref.current.value)
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1,
          });
      }}
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};
```

## - Handling Mutation Error (TodoForm.tsx)

https://prnt.sc/6pOasO8ozW_C

```jsx
// TodoForm.tsx (<Data we get from backend, Error Object, Data we send to backend>)
const addTodo = useMutation<Todo, Error, Todo>({})

{addTodo.error && (
  <div className="alert alert-danger">{addTodo.error.message}</div>
)}
```

## - Showing mutation progress (useMutation has a return type isLoading)

```jsx
// Need not to do anything. useMutation return object which contains isLoading
<button disabled={addTodo.isLoading} className="btn btn-primary">
  {addTodo.isLoading ? "Loading..." : "Add"}
</button>
```

## - Optimistic updates (TodoForm.tsx) Difficult (Can watch again)

onMutate: Call instantly when click on button. Not wait for server response. instant cache update and return context of previous data, <br>
onSuccess: When server response come back. We update cache with variable now need to replace with response comeback from server.<br>
onError: use previousTodos of context to update query cache<br>
Context: is the object to pass data in between callbacks(onMutate, onSuccess, onError).

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddTodoContex {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContex>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((res) => res.data),

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => {
        return [newTodo, ...(todos || [])];
      });

      if (ref.current) ref.current.value = "";

      return { previousTodos }; // it could be access from any callback ie. onError
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};
```

## - Creating a custom mutaion hook (useAddTodo.ts new hook) (Level 0: Generic hook is just cut & paste code inside function )

Updating UI: Component<br>
Data Management: Hook

```jsx
// constants.ts (Keetp thing in one place)
export const CACHE_KEY_TODOS = ["todos"];
```

```jsx
// useAddTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

interface AddTodoContex {
  previousTodos: Todo[];
}

const addTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContex>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((res) => res.data),

    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        // another way
        newTodo,
        ...todos,
      ]);
      //
      onAdd();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};
```

```jsx
// TodoForm.tsx
import { useRef } from "react";
import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef < HTMLInputElement > null;
  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};
```

## - Creating a Reusable API Client (api-client.ts) createing a class for CRUD ((Generic)Level 1: api-client.ts there is common basa url and axios config)

- In the case of CRUD is more convenient using Class

```jsx
// api-client.ts Class component is easy to create using constractor
import axios, { CanceledError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class APIClient<T> {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endPoint).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endPoint, data).then((res) => res.data);
  };
}

export default APIClient; // Exporting APIClient
```

```jsx
// useTodos.ts - Hook, just passing function refreence apiClient.getAll, not function call
import APIClient from "../services/api-client";

const apiClient = new APIClient<Todo>("/todos"); // creating object

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll, // We just need to pass reference of function| not like ()=>apiClient.getAll
    staleTime: 10 * 1000, // 10s
  });
};
```

```jsx
// useAddPost.tsx (Hook)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { Post } from "../rq-services/api-client";

const apiClient = new APIClient<Post>("/posts");

interface AddPostContext {
  previousPosts: Post[];
}

const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, Post, AddPostContext>({
    mutationFn: apiClient.post,

    onMutate(newPost: Post) {
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]) || [];
      queryClient.setQueryData<Post[]>(["posts"], (posts) => [
        newPost,
        ...(posts || []),
      ]);
      return { previousPosts };
    },

    onSuccess: (savedPost, newPost) => {
      console.log(savedPost);
      queryClient.setQueryData<Post[]>(["posts"], (posts) =>
        posts?.map((post) => (post.id == newPost.id ? savedPost : post))
      );
    },

    onError: (error, newPost, context) => {
      if (!context) return;

      queryClient.setQueryData(["posts"], context.previousPosts);
    },
  });
};

export default useAddPost;
```

## - Creating different services like postServices.ts, todoService.ts (todoService.ts) ((Generic)Level 2: postService.ts )

- Reduce these two lines from upper code
- Import APIClient and export instance with enpoint

```jsx
import APIClient, { Post } from "../rq-services/api-client";
const apiClient = new APIClient() < Post > "/posts";
```

```jsx
// postService.ts (Just import APIClient and export instance with enpoint)
import APIClient from "./api-client";

export interface Post {
  id: number;
  title: string;
  userId: number;
}

export default new APIClient() < Post > "/posts";
```

```jsx
// todoService.ts (For Todos)
import APIClient from "./api-client";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
export default new APIClient<Todo>("/todos");

// useTodos.ts Just import todoService, {Todo} from todoService.ts and use it
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll, // We just need to pass reference of function
    staleTime: 10 * 1000, // 10s
  });
};
```

```jsx
// useAddTodo.ts
import todoService, { Todo } from "../services/todoService";

interface AddTodoContex {
  previousTodos: Todo[];
}

const addTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContex>({
    mutationFn: todoService.post,
..............................................
.............
};
```

## - Creating a reusuable HTTP service. postService.ts -> httpService.ts ((Generic)Level 3)

- In upper code we can separate api-client
- In Summary
  - api-client.ts
  - http-service.ts
  - postService.ts
  - usePosts.ts (hook)
- TypeScript type annotations place: 1. myFn<T>(), 2. myFn<T>, 3. <T>()

```jsx
// api-client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default apiClient;
```

```jsx
// http-service.ts (All Generic Type T)
import apiClient from "./api-client";

class HTTPService<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = () => {
    return apiClient.get<T[]>(this.endPoint).then((res) => res.data);
  };

  post = (newData: T) => {
    return apiClient.post<T>(this.endPoint, newData).then((res) => res.data);
  };
}

// export default new HttpService(); Instade of we can use this
const create = <T>(endPoint: string) => new HTTPService<T>(endPoint);
export default create;
Or, export default <T>(endPoint: string) => new HTTPService<T>(endPoint);
```

```jsx
// postService.ts
import create from "./http-service";

export interface Post {
  id: number;
  title: string;
  userId: number;
}

export default create < Post > "/posts"; // export default create<Post>("/posts");
```

```jsx
// usePosts.ts
import { useQuery } from "@tanstack/react-query";
import postService, { Post } from "../rq-services/postService";

interface PostQuery {
  pageSize: number;
}

const usePosts = ({ pageSize }: PostQuery) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: postService.getAll,
    keepPreviousData: true,
  });
};

export default usePosts;
```

# React Router

```bash
npm install react-router-dom
```

```jsx
// routing/routers.tsx (convension) | You can use any name
import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import HomePage from "./HomePage";
import UserDetailsPage from "./UserDetailsPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/users/:id", element: <UserDetailsPage /> },
]);

export default router;
```

```jsx
// main.tsx
import { RouterProvider } from "react-router-dom";
import router from "./routing/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
- Nevegation

```jsx
// HomePage.tsx
<Link to="/about" className="text-blue-500 hover:underline">
  Contact
</Link>
<Link to="/contact" className="text-blue-500 hover:underline">
  Contact
</Link>
```
- Pragrametically redirect to a page. Hook: useNavigate, navigate("/") 
```jsx
import { useNavigate } from "react-router-dom";

const SubmitForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <button type="submit">Submit</button>
      </form>
      <a href="/">HomePage</a>
    </div>
  );
};

```

### Passing data with route parameter: user/1
```jsx
<Link to="/users/1">User 1</Link>
<Link to={`/user/${user.id}`}>User 1</Link>
```

### Getting Data about the Current Route: useParams, useSearchParams, useLocation
```jsx
// UserDetailsPage.tsx
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserDetailsPage = () => {
  const params = useParams();
  const [searchParams, SetSearchPrams] = useSearchParams();
  const location = useLocation();

  // http://localhost:5174/users/1?teacher=subroto
  console.log(params); // 1
  console.log(searchParams.toString()); // teacher=subroto
  console.log(searchParams.get("teacher")); // subroto
  console.log(location); // { "pathname": "/users/1", "search": "?teacher=subroto" ......}

  return (
    <div>
      <Header />
      UserDetailsPage
    </div>
  );
};
```

### Nested Routes
```jsx

```

```jsx

```

```jsx

```

```jsx

```