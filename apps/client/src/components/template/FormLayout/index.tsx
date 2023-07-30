import React from "react";
import Layout from "@/components/template/Layout";
import FormLayoutProps from "./type";

function FormLayout({ children }: FormLayoutProps) {
  return (
    <Layout backgroundColor="blue">
      <div className="w-[760px]">{children}</div>
    </Layout>
  );
}

export default FormLayout;
