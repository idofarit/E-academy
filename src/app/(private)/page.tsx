"use client";

import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";

function Home() {
  const { currentUserData } = usersGlobalStore() as IUserGlobalStore;

  return (
    <div>
      <h1>name: {currentUserData?.name}</h1>
    </div>
  );
}
export default Home;
