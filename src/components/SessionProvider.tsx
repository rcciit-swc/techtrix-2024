"use client";

import { useUser } from "@/lib";
import { useEffect } from "react";
import { getUserInfo } from "@/utils/functions";

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUser);

  const readUserSession = async () => {
    const userData = await getUserInfo();
    setUser(userData);
  };

  useEffect(() => {
    readUserSession();
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default SessionProvider;
