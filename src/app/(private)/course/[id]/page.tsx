import { getDateTimeFormat } from "@/helpers/date-time-format";
import { ICourse } from "@/interfaces";
import { getCourseById } from "@/server-actions/courses";
import { Alert } from "antd";
import CourseDescription from "./_components/course-description";
import CourseCurriculum from "./_components/course-curriculum";
import PurchaseCourse from "./_components/purchase-course";

async function CourseInfoPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await getCourseById(params.id);
  if (!response.success) {
    return <Alert message={response.message} type="error" />;
  }
  const course: ICourse = response.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
      <div className="col-span-2">
        <div className="p-5 section-bg ">
          <h1 className="text-xl font-bold">{course.title}</h1>
          <p className="text-sm">{course.subTitle}</p>
          <div className="flex justify-between mt-5 text-sm gap-2">
            <p>
              Released On : <b>{getDateTimeFormat(course.createdAt)}</b>
            </p>
            <p>
              Last Updated On : <b>{getDateTimeFormat(course.updatedAt)}</b>
            </p>
            <p>
              Students Enrolled : <b>69</b>
            </p>
          </div>
        </div>

        <CourseDescription course={course} />

        <CourseCurriculum course={course} />
      </div>

      <div className="col-span-1">
        <PurchaseCourse course={course} />
      </div>
    </div>
  );
}
export default CourseInfoPage;
