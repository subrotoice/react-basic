import React, { Children } from "react";

// TypeScript Interface: Say types of porps element
interface Props {
  children: string;
  color?: "Primary" | "secondary" | "danger"; // ? For Optional, Outside this value you can not set
  onClick: (children: string) => void;
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

export default Button;
