"use client";

import PageTitle from "@/components/pageTitle";
import Spinner from "@/components/Spinner";
import { getDateTimeFormat } from "@/helpers/date-time-format";
import { IEnrollment } from "@/interfaces";
import { getStudentEnrollments } from "@/server-actions/enrollments";
import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";
import { Alert, App } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function EnrolledCoursesPage() {
  const { currentUserData } = usersGlobalStore() as IUserGlobalStore;
  const [enrollments, setEnrollments] = React.useState<IEnrollment[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();
  const { message } = App.useApp();

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getStudentEnrollments(currentUserData?._id!);
      if (response.success) {
        setEnrollments(response.data);
      } else {
        message.error(response.message);
        setError(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <div>
      <PageTitle title="Enrolled courses" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {enrollments.map((enrollment) => (
          <div
            className="flex flex-col cursor-pointer section-bg"
            onClick={() =>
              router.push(
                `/user/enrolled-courses/watch/${enrollment.course._id}`
              )
            }
            key={enrollment._id}
          >
            <img
              src={enrollment.course.coverImage}
              alt=""
              className="h-40 w-full object-cover rounded-md"
            />
            <div className="p-5">
              <h1 className="text-sm font-semibold">
                {enrollment.course.title}
              </h1>
              <span className="text-xs">
                Enrolled on : {getDateTimeFormat(enrollment.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EnrolledCoursesPage;
