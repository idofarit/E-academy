"use client";

import Spinner from "@/components/Spinner";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";

function LayOutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const { setCurrentUserData, currentUserData }: IUserGlobalStore =
    usersGlobalStore() as IUserGlobalStore;

  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const { success, data } = await getCurrentUserFromMongoDB();
      if (success) setCurrentUserData(data);
      else {
        throw new Error("An error occured");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthRoute && !currentUserData) getCurrentUser();
  }, [pathName]);

  const isAuthRoute = pathName.includes("/sign");

  if (isAuthRoute) return children;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
}
export default LayOutProvider;
