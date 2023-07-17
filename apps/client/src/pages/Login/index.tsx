"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Login() {
  const router = useRouter();

  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = async () => {
    window.location.href = `http://127.0.0.1:8080/api/users/redirect`;
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/");
  };

  return (
    <section className="w-full h-screen flex items-center justify-center select-none bg-blue3">
      <div className="flex flex-col items-center justify-center w-[600px] pt-20 pb-14 border border-grey3 rounded-lg bg-white">
        <Image src="/icons/github.svg" height={16} width={16} alt="github icon" />
        <Image src="/images/Logo.png" width={300} height={50} alt="logo" draggable={false} />
        <button
          onClick={handleClickOAuth}
          className="w-[460px] flex items-center justify-center bg-black border-none text-white mt-9 py-2 px-4 text-base rounded-lg cursor-pointer font-medium"
        >
          <Image src="/icons/github.svg" height={16} width={16} alt="github icon" />
          <span className="ml-2">깃허브 로그인</span>
        </button>
        <button
          onClick={handleClickHome}
          className="w-[460px] bg-grey2 border-none text-black mt-4 py-2 px-4 text-base rounded-lg cursor-pointer font-medium"
        >
          메인 화면으로 돌아가기
        </button>
      </div>
    </section>
  );
}

export default Login;
