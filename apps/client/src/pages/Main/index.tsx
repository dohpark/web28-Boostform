"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authProvider";
import FormLayout from "@/components/template/Layout";
import Button from "@/components/common/Button";

function Main() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    const path = auth?.userId ? "/myForms" : "/login";
    router.push(path);
  };

  return (
    <FormLayout backgroundColor="white">
      <section className="flex justify-between mt-16 min-w-[1024px]">
        <div className="w-[512px] ml-auto">
          <h1 className="text-6xl mr-auto max-w-xl select-none leading-normal">
            Boost Forms로 설문조사를 빠르게 작성하세요!
          </h1>
          <p className="mt-9 mb-6 text-xl select-none leading-7">
            온라인 양식과 설문조사를 손쉽게 만들고 공유할 수 있습니다.
          </p>
          <Button type="button" onClick={() => handleClick()} className="bg-blue3 text-white text-base">
            시작하기
          </Button>
        </div>
        <div className="relative w-[512px] ml-9 select-none">
          <Image
            src="/images/Example.png"
            alt="example"
            width="675"
            height="949"
            className="w-full min-w-[400px] max-w-[600px]"
            draggable={false}
          />
        </div>
      </section>
    </FormLayout>
  );
}

export default Main;
