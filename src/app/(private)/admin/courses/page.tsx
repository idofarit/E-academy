import PageTitle from "@/components/pageTitle";
import { Button } from "antd";
import Link from "next/link";

function AdminCoursesPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Courses" />
        <Button>
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </div>
    </div>
  );
}
export default AdminCoursesPage;
