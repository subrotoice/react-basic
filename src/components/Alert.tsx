import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "success" | "danger";
  onClose: (data: string) => void;
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
};

export default Alert;
