import React, { Children } from "react";
interface Props {
  name: string;
  children: string;
  country?: "Bangladesh" | "India" | "USA";
  onClickTest: (data: string) => void;
}
const Person = ({ name, country = "India", children, onClickTest }: Props) => {
  return (
    <div>
      <h1>
        {name} and {children} and {country}
      </h1>
      <button onClick={() => onClickTest("subotoBiswas")}>Click Here</button>
      <ul className="list-group">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Morbi leo risus</li>
        <li className="list-group-item">Porta ac consectetur ac</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>
  );
};

export default Person;
