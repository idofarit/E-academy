import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Button, message } from "antd";
import {
  BookOpenText,
  BookPlus,
  GalleryThumbnails,
  Home,
  List,
  LogOut,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function MenuItems({
  setShowSideBar,
}: {
  setShowSideBar: (value: boolean) => void;
}) {
  const pathName = usePathname();

  const [loading, setLoading] = useState(false);

  const { signOut } = useClerk();

  const router = useRouter();

  const { currentUserData } = usersGlobalStore() as IUserGlobalStore;

  const userMenuItems = [
    {
      name: "Enrolled Courses",
      icon: <BookPlus size={14} />,
      isActive: pathName === "/user/enrolled-courses",
      path: "/user/enrolled-courses",
    },
    {
      name: "Profile",
      icon: <User size={14} />,
      isActive: pathName === "/user/profile",
      path: "/user/profile",
    },
  ];

  const adminMenuItems = [
    {
      name: "Home",
      icon: <Home size={14} />,
      isActive: pathName === "/",
      path: "/",
    },
    {
      name: "Courses",
      icon: <BookOpenText size={14} />,
      isActive: pathName === "/admin/courses",
      path: "/admin/courses",
    },
    {
      name: "Students",
      icon: <List size={14} />,
      isActive: pathName === "/admin/students",
      path: "/admin/students",
    },
    {
      name: "Media Library",
      icon: <GalleryThumbnails size={14} />,
      isActive: pathName === "/admin/media-library",
      path: "/admin/media-library",
    },
    {
      name: "Enrollments",
      icon: <Users size={14} />,
      isActive: pathName === "/admin/enrollments",
      path: "/admin/enrollments",
    },
    {
      name: "Reports",
      icon: <Trophy size={14} />,
      isActive: pathName === "/admin/reports",
      path: "/admin/reports",
    },
  ];

  let menuItemsToRender = currentUserData?.isAdmin
    ? adminMenuItems
    : userMenuItems;

  const onLogOut = async () => {
    try {
      setLoading(true);
      await signOut({ redirectUrl: "/sign-in" });
      message.success("LoggedOut successfully");
    } catch (error: any) {
      message.error("Failed to Logout");
    } finally {
      setShowSideBar(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {menuItemsToRender.map((menuItem: any, index) => (
        <div
          className={`flex gap-3 p-3 items-center cursor-pointer 
        ${menuItem.isActive ? "bg-gray-300 rounded" : ""}
        `}
          key={index}
          onClick={() => {
            router.push(menuItem.path);
            setShowSideBar(false);
          }}
        >
          {menuItem.icon}
          <span className="text-gray-500">{menuItem.name}</span>
        </div>
      ))}

      <Button onClick={onLogOut} loading={loading} icon={<LogOut size={14} />}>
        Logout
      </Button>
    </div>
  );
}
export default MenuItems;
