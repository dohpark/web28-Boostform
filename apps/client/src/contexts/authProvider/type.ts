import React from "react";

interface AuthProps {
  userId: string;
  userName: string;
  state: "loading" | "login" | "logout";
}

interface AuthContextProps {
  auth?: AuthProps;
  setAuth?: React.Dispatch<React.SetStateAction<AuthProps>>;
}

export type { AuthContextProps, AuthProps };
