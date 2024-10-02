import PageTitle from "@/components/pageTitle";
import CourseForm from "../../_components/course-form";
import { getCourseById } from "@/server-actions/courses";
import { Alert } from "antd";

async function EditCoursePage({ params }: { params: { id: string } }) {
  const courseResponse = await getCourseById(params.id);

  if (!courseResponse.success) {
    return <Alert message={courseResponse.message} type="error" />;
  }

  const course = courseResponse.data;

  return (
    <div>
      <PageTitle title="Edit course" />
      <CourseForm courseData={course} type="edit" />
    </div>
  );
}
export default EditCoursePage;
