"use client";

import React, { createContext, useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import authApi from "@/api/authApi";
import { AuthContextProps, AuthProps } from "./type";

export const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthProps>({ userId: "", userName: "", state: "loading" });
  const [cookies] = useCookies();

  const fetchUserId = (): Promise<{ userID: string; userName: string }> =>
    authApi.getUserInfo(cookies.accessToken as string | null);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchUserId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) setAuth({ userId: data.userID, userName: data.userName, state: isSuccess ? "login" : "logout" });
    if (isError) setAuth({ userId: "", userName: "", state: "logout" });
  }, [data, isSuccess, isError]);

  const AuthContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
}
