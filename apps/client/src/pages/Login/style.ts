import styled from "styled-components";
import theme from "styles/theme";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  background-color: #3c64b1;
`;

const Img = styled.img`
  width: 50%;
  border-radius: 3px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 600px;
  padding-top: 80px;
  padding-bottom: 60px;
  border: 1px solid #c8c8c8;
  border-radius: 9px;
  background-color: #ffffff;
`;

const OAuthButton = styled.button`
  width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: black;
  border: none;
  color: #ffffff;
  margin-top: 36px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const HomeButton = styled.button`
  width: 460px;

  background-color: #dfdfdf;
  border: none;
  color: #000000;
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const ButtonText = styled.span`
  margin-left: 8px;
`;

export { Container, LoginContainer, OAuthButton, HomeButton, ButtonText, Img };
