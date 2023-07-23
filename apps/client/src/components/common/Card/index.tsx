import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 border-t-2 border-grey8">{children}</div>;
}

function Item({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="pt-6 pb-5 px-5 border border-grey3 mt-2 first:mt-0">
      <h3 className="mb-1 text-base font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ItemText({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-grey5">{children}</span>;
}

function ButtonWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex mt-4">{children}</div>;
}

const Card = Object.assign(Container, { ItemText, Item, ButtonWrapper });

export default Card;
