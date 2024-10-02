import PageTitle from "@/components/pageTitle";
import { getAllCourses } from "@/server-actions/courses";
import { Alert, Button } from "antd";
import Link from "next/link";
import CoursesTable from "./_components/CoursesTable";

async function AdminCoursesPage() {
  const courseResponse = await getAllCourses();

  if (!courseResponse.success) {
    return <Alert message="Failed to fetch courses" type="error" />;
  }

  const courses = courseResponse.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Courses" />
        <Button type="primary">
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </div>

      <CoursesTable courses={courses} />
    </div>
  );
}
export default AdminCoursesPage;
