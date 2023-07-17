import React from "react";
import Header from "@/components/Header";
import LayoutProps from "./type";

function Layout({ children, backgroundColor }: LayoutProps) {
  const bgColor = backgroundColor == "white" ? "bg-white" : "bg-blue-500";
  const mainClassName = `${bgColor} ml-auto mr-auto flex justify-center min-h-[calc(100vh-60px)]`;

  return (
    <>
      <Header />
      <main className={mainClassName}>{children}</main>
    </>
  );
}

export default Layout;
