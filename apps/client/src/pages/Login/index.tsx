"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as S from "./style";

function Login() {
  const router = useRouter();

  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = async () => {
    window.location.href = `${process.env.REACT_APP_SERVER_ORIGIN_URL}/api/users/redirect`;
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/");
  };

  return (
    <S.Container>
      <S.LoginContainer>
        <Image src="/icons/github.svg" height={16} width={16} alt="github icon" />
        <Image src="/icons/logo.svg" width={100} height={50} alt="logo" draggable={false} />
        <S.OAuthButton onClick={handleClickOAuth}>
          <Image src="/icons/github.svg" height={16} width={16} alt="github icon" />
          <S.ButtonText>깃허브 로그인</S.ButtonText>
        </S.OAuthButton>
        <S.HomeButton onClick={handleClickHome}>메인 화면으로 돌아가기</S.HomeButton>
      </S.LoginContainer>
    </S.Container>
  );
}

export default Login;
