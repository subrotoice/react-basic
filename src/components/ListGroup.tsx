import { MouseEvent } from "react";

function ListGroup() {
  const items = [
    "Ney York",
    "London",
    "San Frincisco",
    "Pais",
    "Dhaka",
    "Delhi",
  ];

  const handelClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={item} className="list-group-item" onClick={handelClick}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
