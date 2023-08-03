import { MouseEvent, useState } from "react";
import styles from "./ListGroup.module.css";

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
      <ul className="list-group">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Morbi leo risus</li>
        <li className="list-group-item">Porta ac consectetur ac</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul>
      <h1>{props.heading}</h1>
      {props.items.length === 0 && <p>No Item found</p>}
      <ul
        className={[styles.listGroup, styles.container, "list-group"].join(" ")}
        style={{ backgroundColor: "red", color: "white" }}
      >
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
