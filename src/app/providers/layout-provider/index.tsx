"use client";

import Spinner from "@/components/Spinner";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";
import { useUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

function LayOutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { setCurrentUserData, currentUserData }: IUserGlobalStore =
    usersGlobalStore() as IUserGlobalStore;
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("/sign");

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const { success, data } = await getCurrentUserFromMongoDB();
      if (success) {
        setCurrentUserData(data);
      } else {
        throw new Error("An error occurred while fetching user data");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthRoute && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  if (isAuthRoute) {
    return children;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />;
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
}
export default LayOutProvider;
