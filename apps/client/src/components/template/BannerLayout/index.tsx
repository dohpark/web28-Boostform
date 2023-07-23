import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import LayoutProps from "./type";

function BannerLayout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="relative w-full h-[160px]">
        <h1 className="absolute text-3xl font-medium text-center text-white left-0 right-0 my-0 mx-auto top-12 z-10">
          {title}
        </h1>
        <p className="absolute text-center text-base text-grey0 left-0 right-0 my-0 mx-auto top-24 z-10">
          {description}
        </p>
        <Image alt="banner" src="/images/Banner.png" priority fill />
      </div>
      <main className="ml-auto mr-auto flex justify-center bg-white">{children}</main>
    </>
  );
}

export default BannerLayout;
