import React from "react";
import { IconButtonProps } from "./type";

function IconButton({ type, onClick, disabled, children, className: customCss }: IconButtonProps) {
  const defaultCss =
    "p-0 border-none rounded outline-none bg-transparent cursor-pointer inline-flex items-center justify-center hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-150 ";
  const className = defaultCss + customCss;

  return (
    <button onClick={onClick} disabled={disabled} type={type} className={className}>
      {children}
    </button>
  );
}

export default IconButton;
