import React, { Children } from "react";
import styles from "./Button.module.css";

// TypeScript Interface: Say types of porps element
interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger"; // ? For Optional, Outside this value you can not set
  onClick: (data: string) => void;
}
// Destructing Props
const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      className={[styles.btn, styles.btnPrimary].join(" ")}
      onClick={() => onClick("Subroto")} // Function defination comes from App.js but argument pass from here to App.js
    >
      {children}
    </button>
  );
};

export default Button;
