# TypeScript and Vite and React Basic

[ReactJs Gist Subroto](https://gist.github.com/subrotoice/98eb2fcbcef23c733cd36e0575c2e37c)

# Basic's of butliding Component

**TypeScript Interface & Button**<br />
Say types of porps element | Outside the component function<br />

```javascript
// TypeScript Interface: To define Shape of Props
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

# Styling Components -----

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

## Installation

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
