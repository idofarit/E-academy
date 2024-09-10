import { App, Button, Dropdown, MenuProps } from "antd";
import { Edit2Icon, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import ActionItemMenu from "./ActionItemMenu";
import LessonFormModal from "./LessonFormModal";

function LessonData({
  lesson,
  lessonIndex,
  setSections,
  sectionIndex,
}: {
  sectionIndex: number;
  lesson: any;
  setSections: any;
  lessonIndex: number;
}) {
  const { message } = App.useApp();

  const [showLessonModal, setShowLessonModal] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ActionItemMenu
          onClick={() => setShowLessonModal(true)}
          title="Edit"
          icon={<Edit2Icon size={20} />}
        />
      ),
    },
    {
      key: "2",
      label: (
        <ActionItemMenu
          onClick={() => handleDeleteLesson()}
          title="Delete"
          icon={<Trash size={20} />}
        />
      ),
    },
  ];

  const handleDeleteLesson = () => {
    try {
      setSections((prev: any) => {
        const updatedSections = [...prev];
        updatedSections[sectionIndex].lessons.splice(lessonIndex, 1);
        return updatedSections;
      });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      message.success("deleted successfully");
    }
  };

  return (
    <div key={lessonIndex} className="lesson-bg">
      <div className="flex justify-between items-center">
        <h1 className="text-sm text-txt-content font-semibold ">
          {lessonIndex + 1} : &nbsp; {lesson.name}
        </h1>

        <Dropdown trigger={["click"]} menu={{ items }} placement="bottomLeft">
          <Button
            className="text-text-clr border-none bg-transparent "
            size="small"
          >
            <MoreVertical size={20} />
          </Button>
        </Dropdown>
      </div>

      {showLessonModal && (
        <LessonFormModal
          sectionIndex={sectionIndex}
          setSections={setSections}
          selectedLesson={lesson}
          lessonIndex={lessonIndex}
          showLessonModal={showLessonModal}
          type="Edit"
          setShowLessonModal={setShowLessonModal}
        />
      )}
    </div>
  );
}
export default LessonData;
