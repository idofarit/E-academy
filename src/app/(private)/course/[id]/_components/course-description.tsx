import { ICourse } from "@/interfaces";
import { Parser } from "html-to-react";

const parser = Parser();

function CourseDescription({ course }: { course: ICourse }) {
  return (
    <div>
      <h1 className="text-xl font-bold mt-5 ml-5">Description</h1>
      <div className="mt-5 section-bg p-5">
        <div className="text-sm">{parser.parse(course.description)}</div>
      </div>
    </div>
  );
}
export default CourseDescription;
