"use client";

import { ICourse } from "@/interfaces";
import { Collapse, CollapseProps } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

function CourseCurriculum({ course }: { course: ICourse }) {
  return (
    <div className="mt-5 section-bg">
      <h1 className="text-xl font-bold pl-5">Course Curriculum</h1>
      <div className="mt-5">
        <Collapse>
          {course.sections.map((section, sectionIndex) => (
            <CollapsePanel header={section.name} key={sectionIndex.toString()}>
              <div className="flex flex-col gap-4 ">
                {section.lessons.map((lesson: any, lessonIndex: number) => (
                  <div key={lessonIndex} className="text-sm">
                    {lessonIndex + 1} : {lesson.name}
                  </div>
                ))}
              </div>
            </CollapsePanel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
export default CourseCurriculum;
