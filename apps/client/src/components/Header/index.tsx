import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "contexts/authProvider";
import authApi from "api/authApi";
import Button from "components/common/Button";
import theme from "styles/theme";
import * as S from "./style";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickLogout = () => {
    if (!setAuth) return;
    authApi.logout();
    setAuth({ userId: "", userName: "" });
    router.push("/");
  };

  return (
    <S.HeaderContainer>
      <S.Layout>
        <Link href="/">
          <Image src="icons/logo.svg" alt="logo" width={120} height={36} draggable={false} />
        </Link>
        <S.LinkButtonWrapper>
          {auth?.userId && <Link href="/myForms">내 설문지</Link>}
          <Link href="/forum">게시판</Link>
          <a href="https://boostcamp-wm.notion.site/Web28-BoostForm-ebdeff01de9241c0a453742f42f1a633">프로젝트 소개</a>
          {auth?.userId && (
            <Button
              type="button"
              onClick={onClickLogout}
              backgroundColor={theme.colors.white}
              border={theme.colors.blue3}
              color={theme.colors.blue3}
              fontSize={theme.fontSize.sz14}
              active={false}
            >
              로그아웃
            </Button>
          )}
          {!auth?.userId && (
            <Button
              type="button"
              onClick={onClickLogin}
              backgroundColor={theme.colors.blue3}
              border="none"
              color={theme.colors.white}
              fontSize={theme.fontSize.sz16}
            >
              로그인
            </Button>
          )}
        </S.LinkButtonWrapper>
      </S.Layout>
    </S.HeaderContainer>
  );
}

export default Header;
