# TypeScript and Vite and React Basic

[ReactJs Gist Subroto](https://gist.github.com/subrotoice/98eb2fcbcef23c733cd36e0575c2e37c) <br>
[Lucy Theme](https://vscodethemes.com/e/juliettepretot.lucy-vscode/lucy?language=javascript)

```javascript
// in main.tsx change component to see different implentation
<React.StrictMode>
  <AppFetchingData />
  {/* <App2 />
  <App /> */}
</React.StrictMode>
```

# Ch-1: Basic's of butliding Component

**TypeScript Interface & Button**<br />
Saying types of porps element, it outside the component function<br />
Props: Passing data from parent to child using <br />
Callback Function: Passing data from child to Parent

```javascript
// in Button.js; TypeScript Interface: To define Shape of Props
interface Props {
  children: string;
  color?: "Primary" | "Sedondary" | "Danger"; // ? For Optional, Outside this value you can not set
  onClick: () => void;
}
// Destructing Props
const Button = ({ children, onClick, color }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => onClick(children)} // Function defination comes from App.js but argument pass from here to App.js
    >
      {children}
    </button>
  );
};

// App.js
const selectItem = (item) => {
  console.log(item);
};
return (
  <div>
    <Button color="primary" onClick={onClick}>
      My Button
    </Button>
  </div>
);
```

**Alert: here onClose is Props(Argu), not event like onClick**

```javascript
interface Props {
  children: ReactNode;
  onClose: () => void;
}
const Alert = ({ children, onClose }: Props) => {
  return (
    <div>
      <div className="alert alert-primary alert-dismissible" role="alert">
        {children}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

// App.js,  here onClose is Props(Argu), not event like onClick
{
  alertVisible && (
    <Alert onClose={() => setAlertVisibility(false)}>
      Text Comes from App.tsx
    </Alert>
  );
}
```

**Button: With Default & Optional & Limited Argument**

```javascript
import React, { Children } from "react";

// TypeScript Interface: Say types of porps element
interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger"; // ? For Optional, Outside this value you can not set
  onClick: (children: string) => void;
}
// Destructing Props
const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => onClick(children)} // Function defination comes from App.js but argument pass from here to App.js
    >
      {children}
    </button>
  );
};

export default Button;
```

## List Group ------

```javascript
import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  selectItemFunction: (item: string) => void;
}

function ListGroup(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handelClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{props.heading}</h1>
      {props.items.length === 0 && <p>No Item found</p>}
      <ul className="list-group">
        {props.items.map((item, index) => (
          <li
            key={item}
            // conditional rendering
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              props.selectItemFunction(item); // Function defination comes from App.js but argument pass from here to App.js
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

# Ch-2: Styling Components -----

**Vanilla CSS**

```javascript
// ListGroup.tsx
import "./ListGroup.css";
// ListGroup.css
.list-group {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

**CSS Modules**

```css
// in ListGroup.module.css, module spelling should be careful
.listGroup {
  // .listGroup is an object
  list-style: none;
  margin: 0;
  padding: 0;
}
.container {
  background-color: bisque;
}
```

```html
// in LIstGroup.tsx import styles from "./ListGroup.module.css"; // acccess css,
NO " " here
<ul className="{styles.listGroup}">
  // Apply Multiple class to a html tag <ul className={[styles.listGroup,
  styles.container].join(" ")}>
</ul>
```

**Inline CSS**

```html
<ul style={{ backgroundColor: "red", color: "white" }}>
```

**Adding Icons** <br />
In terminal run

```bash
npm i react-icons@4.7.1
```

```javascript
// Bs first means Bootstrap, https://react-icons.github.io/react-icons
import { BsFillCalendarFill } from "react-icons/bs";
<BsFillCalendarFill />;
<BsFillCalendarFill color="red" size="40" />;
```

### React-State Good Practice --------

```javascript
const [firsName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
// It's better to group related state variable inside an object
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

// **Updating Array**
const [mod, setMood] = useState(["Happy", "Angry"]);
const handelClick = () => {
  // Add
  setMood([...mod, "Joy"]);
  // Delete
  setMood(mod.filter((mod) => mod !== "Happy"));
  // Update: If mod!=Happy return mod itself
  setMood(mod.map((mod) => (mod === "Happy" ? "Happyness" : mod)));
};

<button onClick={handelClick}>Click</button> {mod.join(" ")}
```

```javascript
// **Updating Array of Objects**
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

```javascript
// **Sharing State between Components**
// App.js
const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);
<NavBar cartItemsCount={cartItems.length} />
<Cart cartItems={cartItems} onClear={() => setCartItems([])} />
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
    </>
  );
};
```

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
  if (children.length < 10) return <>{children}</>;
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

# Ch-3: Building Forms ----------------

**Track input element using useRef Hook, Best Performance: no rerender needed**

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

**Track input element using useState Hook, Normally people do, onChange=reRender**

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

**Managing Forms with React Hook Form**
[Watch Video](https://codewithmosh.com/courses/ultimate-react-part1/lectures/45915810)
[TypeScript Data type get] (https://prnt.sc/WsBn3-rT06cS)

```bash
npm i react-hook-form@7.43
```

```javascript
const Form = () => {
  // it use useRef so no rerendering
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

**Data Validation(React Hook Form)**

```javascript
interface FormData {
  // Give this data type in useForm hook, You can ignore this in this type of manual validation
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
  console.log(errors);
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

**Schema based Validation with Zod**
Resolver is schema based validation library for Zod
[Watch-Video] (https://codewithmosh.com/courses/ultimate-react-part1/lectures/45915806)
[Zod](https://zod.dev)

```bash
npm i zod@3.20.6
npm i @hookform/resolvers@2.9.11
```

```javascript
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field must be required" })
    .min(18, { message: "Age must be at least 18" }),
});

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

**Mini Project use of Zod, useFrom, zodResolver ------**

```javascript
// ExpensesForm.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
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

// ExpenseFilter.tsx
import React from "react";
import categories from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <div>
      <select
        name=""
        id=""
        className="form-select"
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

// App.js
import { useState } from "react";
import ExpandableText from "./components/ExpandableText";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Form from "./components/Form";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpensesForm from "./components/expense-tracker/components/ExpensesForm";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [selectedCategory, setSelectedCatagory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 5, category: "Utilities" },
    { id: 2, description: "bbb", amount: 5, category: "Utilities" },
    { id: 3, description: "ccc", amount: 5, category: "Utilities" },
    { id: 4, description: "ddd", amount: 5, category: "Utilities" },
    { id: 5, description: "eee", amount: 10, category: "Groceries" },
    { id: 6, description: "fff", amount: 15, category: "Entertainment" },
    { id: 7, description: "ggg", amount: 1, category: "Utilities" },
  ]);
  // it could be keep in a State in stade of local variable, but it completely unnecessary, because we get it form calculation
  const visibleExpenses =
    selectedCategory !== ""
      ? expenses.filter((e) => e.category === selectedCategory)
      : expenses;

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
}

export default App;
```

# Ch-4: Connecting to the Backend

```bash
// Fetching Data useing fetch(), axios
npm i axios@1.3.4
```

```javascript
// Fetching Data, Without TypeScript
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const AppFetchingData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise: An object that holds the eventual result or failure of an asynchronous(long running) operation. All promise have a method called then(), catch() for errors
    axios
      .get("https://jsonplaceholder.typicode.com/users") // return a Promise
      .then((res) => setUsers(res.data));
  }, []); // Only first time run
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// **********Typescript Version with Error Handeling***********
// Typescript Version with Error Handeling
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
interface User {
  id: number;
  name: string;
}
const AppFetchingData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/xusers")
      .then((res) => setUsers(res.data)) // Success or No Error
      .catch((err) => setError(err.message)); // Fail or Error
  }, []); // Only first time run
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Cancelling Fetch request: If user navegate wawy form the page
// https://codewithmosh.com/courses/ultimate-react-part1/lectures/45915908
useEffect(() => {
  const controller = new AbortController(); // build in class in modern browser, if go away of the page
  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
    .then((res) => setUsers(res.data))
    .catch((err) => {
      if (err instanceof CanceledError) return; // If close brouser then it works
      setError(err.message);
    });

  return () => controller.abort();
}, []); // Only first time run


// Showing Loader untill data come from server. .
........
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
        setLoading(false); // after result come
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then
        setError(err.message);
        setLoading(false); // after result come
      });

    return () => controller.abort();
  }, []); // Only first time run
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      .......................
```

```javascript
// Deleting Data, if error get back to original data
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
    })
    .catch((err) => {
      if (err instanceof CanceledError) return; // If no data here then.
      setError(err.message);
      setLoading(false);
    });

  return () => controller.abort();
}, []);

const deleteUser = (user: User) => {
  const originalUser = [...users]; // Store all users in another variable before delete
  setUsers(users.filter((u) => u.id != user.id));
  axios
    .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
    .then(console.log("back request"))
    .catch((err) => {
      setError(err.message);
      setUsers(originalUser); // If error occure then Get back to original user
    });
};

return (
  <div>
    {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
    <ul className="list-group">
      {users.map((user) => (
        <li
          key={user.id}
          className="list-group-item d-flex justify-content-between"
        >
          {user.name}
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteUser(user)} // passing user
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// Adding User
const addUser = () => {
  const originalUser = [...users];
  const newUser = { id: 0, name: "Subroto" };
  setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
  axios
    .post("https://jsonplaceholder.typicode.com/users", newUser) // Payo
    // .then((res) => {
    //   setUsers([res.data, ...users]); // It will replace previous one
    // }); we can do this by destructiring and renaming
    .then(({ data: savedUser }) => {
      // it create code more readable
      setUsers([savedUser, ...users]); // It will replace previous one
    })
    .catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
};

return (
  <div>
    {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
    <button className="btn btn-primary my-3" onClick={addUser}>
      Add
    </button>
    <ul className="list-group">
      {users.map((user) => (
        <li
          key={user.id}
          className="list-group-item d-flex justify-content-between"
        >
          {user.name}
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteUser(user)} // passing user
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

```

```javascript
// CRUD using axios
import React from "react";
import axios, { CanceledError } from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
interface User {
  id: number;
  name: string;
}
const AppFetchingData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // for first time data loda using useEffect
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
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then.
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUser = [...users]; // Store all users in another variable before delete
    setUsers(users.filter((u) => u.id != user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser); // If error occure then Get back to original user
      });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser) // Payo
      // .then((res) => {
      //   setUsers([res.data, ...users]); // It will replace previous one
      // }); we can do this by destructiring and renaming
      .then(({ data: savedUser }) => {
        // it create code more readable
        setUsers([savedUser, ...users]); // It will replace previous one
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  const updateUser = (user: User) => {
    const originalUser = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    // patch/put() you can use depending on backend
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary my-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)} // passing user
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

export default AppFetchingData;
```

**_ Above code is enough to perform CRUD. But now we try to do some generick(common) approach, not for user _**

14. Extracting a Reusable API Client, 15- Extracting the User Service, 16- Creating a Generic HTTP Service, 16- Creating a Generic HTTP Service
    https://codewithmosh.com/courses/ultimate-react-part1/lectures/45915912

**_ It is little bit high thought think _**
**_ Here AppFetchingData is like App.js so we can not use it as data fetching _**
Componets is responsibe for returning markup and handeling interaction at high level

```javascript
// here folder serices is about data not about UI
// Transfer code from appFetchingData to api-client.ts
// This codding is absolutly fine no need to create hook, but if we need to recreate same code then we can use it accross various component
// Custom hook: Hook just a function, Return a object
// It contains all methods for creating, Updateing, deleting user, so that App.js not not to warry abut data and can foucs on Markup and UI
// receving two values as object, destructing here, one handel data another if browser close
```

**_ App.tsx -> useUsers(hook)-> (api-client -> user-service -> http-service) _**

<details>
<summary>1. AppFetchingData.tsx</summary>

```javascript
import "bootstrap/dist/css/bootstrap.css";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const AppFetchingData = () => {
  // This codding is absolutly fine no need to create hook, but if we need to recreate same code then we can use it accross various component
  // Custom hook: Hook just a function, Return a object
  const { users, error, isLoading, setUsers, setError } = useUsers();
  const deleteUser = (user: User) => {
    const originalUser = [...users]; // Store all users in another variable before delete
    setUsers(users.filter((u) => u.id != user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUser); // If error occure then Get back to original user
    });
  };
  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Subroto" };
    setUsers([newUser, ...users]); // later setUsers replace this id: 0 user and set id: 11 user, you can check with useEffect and consol.log
    userService
      .create(newUser)
      .then(({ data: savedUser }) => {
        // it create code more readable
        setUsers([savedUser, ...users]); // It will replace previous one
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  const updateUser = (user: User) => {
    const originalUser = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (user.id == u.id ? updatedUser : u)));
    // patch/put() you can use depending on backend
    userService.update(user).catch((err) => {
      setError(err.message);
      setUsers(originalUser);
    });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary my-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)} // passing user
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
```

</details>

<details>
<summary>2. useUsers.ts (hook)</summary>

```javascript
import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // for first time data loda using useEffect
  useEffect(() => {
    setLoading(true);
    // It contains all methods for creating, Updateing, deleting user, so that App.js not not to warry abut data and can foucs on Markup and UI
    // receving two values as object, destructing here, one handel data another if browser close
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // If no data here then.
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);
  // hook is just a function, have a return values, Reuren state variable so that it can reuse
  // Return an object
  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
```

</details>

<details>
<summary>3. api-client.ts</summary>

```javascript
import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  //   headers: {
  //     'api-key': '...' // Sometimes needed
  //   }
});

export { CanceledError };
```

</details>

<details>
<summary>4. user-service.ts</summary>

```javascript
import create from "./http-service";

// just add export to use multiple place
export interface User {
  id: number;
  name: string;
}

export default create("/users"); // Only place to provide endpoint
```

</details>

<details>
<summary>5. http-service.ts</summary>

```javascript
import apiClient, { CanceledError } from "./api-client";
// try to do some generic (common) approach
interface Entity {
  id: number;
}
class HttpService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  // Here is nothing about users
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() }; // returning two values
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);
export default create;
```

</details>

## Demo Content ------------------

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

```php
$s = "Python syntax highlighting";
echo "Value: " . $s;
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

### License

[EDEVES.COM](https://edeves.com)

Bullet lists nested within numbered list:

1. fruits
   - apple
   - banana
2. vegetables
   - carrot
   - broccoli
   - [edeves](https://edeves.com)

> blockquoting: Markdown uses email-style
> characters for blockquoting.
>
> Multiple paragraphs need to be prepended individually.

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

<details>
<summary>Collapsed section with Table</summary>

| Rank | Languages  |
| ---: | ---------- |
|    1 | Javascript |
|    2 | Python     |
|    3 | SQL        |

_You can use it for table also_

</details>

[![Link Test](https://img.shields.io/badge/fineTune.svg?style=flat-square)](https://edeves.com)

[edeves](https://edeves.com)
