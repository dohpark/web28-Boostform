"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authProvider";
import authApi from "@/api/authApi";
import Button from "@/components/common/Button";
import Loading from "./loading";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickLogout = () => {
    if (!setAuth) return;
    authApi.logout();
    setAuth({ userId: "", userName: "", state: "logout" });
    router.push("/");
  };

  return (
    <header className="box-content flex bg-white mx-8">
      <div className="min-w-[1024px] ml-auto mr-auto flex items-center justify-between">
        <Link className="no-underline	decoration-black active:no-underline active:decoration-black" href="/">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={100}
            height={100}
            style={{ width: "80px", height: "80px" }}
            draggable={false}
            priority
          />
        </Link>
        <div className="flex items-center justify-end">
          {auth?.userId && (
            <Link className="mr-12" href="/myForms">
              내 설문지
            </Link>
          )}
          <Link href="/forum" className="mr-12">
            게시판
          </Link>
          {auth?.state === "login" && (
            <Button type="button" onClick={onClickLogout} className="bg-white text-blue3 text-sm border border-blue3">
              로그아웃
            </Button>
          )}
          {auth?.state === "logout" && (
            <Button type="button" onClick={onClickLogin} className="bg-blue3 text-white text-base border-none">
              로그인
            </Button>
          )}
          {auth?.state === "loading" && <Loading />}
        </div>
      </div>
    </header>
  );
}

export default Header;
