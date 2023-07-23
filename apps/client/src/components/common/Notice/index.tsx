import React from "react";
import { NoticeProps } from "./type";

function Notice({ text, className: customCss }: NoticeProps) {
  const defaultCss = "my-4 mx-0 py-4 px-0 text-center font-medium ";
  const className = defaultCss + customCss;

  return <p className={className}>{text}</p>;
}

export default Notice;
