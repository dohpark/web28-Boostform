import React from "react";
import { TextButtonProps } from "./type";

function TextButton({ children, className: customCss, onClick }: TextButtonProps) {
  const defaultCss = "b-0 outline-none m-0 p-0 bg-none cursor-pointer hover:decoration-solid hover:brightness-[85%]";
  const className = `${defaultCss} ${customCss}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default TextButton;
