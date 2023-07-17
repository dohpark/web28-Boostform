import React from "react";

function Notice({ text, className: customCss }: { text: string; className: string }) {
  const defaultCss = "my-4 mx-0 py-4 px-0 text-center font-medium ";
  const className = defaultCss + customCss;

  return <p className={className}>{text}</p>;
}

export default Notice;
