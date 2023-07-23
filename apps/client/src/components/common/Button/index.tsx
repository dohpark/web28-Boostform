import React from "react";
import { ButtonProps } from "./type";

function Button({ children, type, onClick, className: customCss }: ButtonProps) {
  const defaultCss = "flex items-center font-normal px-4 py-2 rounded cursor-pointer ";
  const className = defaultCss + customCss;

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
