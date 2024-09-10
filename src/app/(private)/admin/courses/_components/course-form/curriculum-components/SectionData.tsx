import type { MenuProps } from "antd";
import { App, Button, Dropdown } from "antd";
import { Edit2Icon, MoreVertical, Plus, Trash } from "lucide-react";
import { useState } from "react";
import ActionItemMenu from "./ActionItemMenu";
import LessonData from "./LessonData";
import LessonFormModal from "./LessonFormModal";
import SectionFormModal from "./SectionFormModal";

function SectionData({
  section,
  setSections,
  sectionIndex,
}: {
  section: any;
  setSections: any;
  sectionIndex: number;
}) {
  const [showLessonModal, setShowLessonModal] = useState(false);

  const [showSectionFormModal, setSHowSectionFormModal] = useState(false);

  const { message } = App.useApp();

  const handleDeleteSection = () => {
    try {
      setSections((prev: any) => {
        const updatedSections = [...prev];
        updatedSections.splice(sectionIndex, 1);
        return updatedSections;
      });
    } catch (error: any) {
      message.error(error.message);
    } finally {
      message.success("deleted successfully");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ActionItemMenu
          onClick={() => setSHowSectionFormModal(!showSectionFormModal)}
          title="Edit"
          icon={<Edit2Icon size={20} />}
        />
      ),
    },
    {
      key: "2",
      label: (
        <ActionItemMenu
          onClick={() => handleDeleteSection()}
          title="Delete"
          icon={<Trash size={20} />}
        />
      ),
    },
    {
      key: "3",
      label: (
        <ActionItemMenu
          onClick={() => setShowLessonModal(true)}
          title="Add lesson"
          icon={<Plus size={20} />}
        />
      ),
    },
  ];

  return (
    <div className="section-bg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semi text-txt-heading">
          Section {sectionIndex + 1} : {section.name}
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

      <div className="flex flex-col gap-5 mt-5">
        {section.lessons.map((lesson: any, lessonIndex: number) => (
          <LessonData
            sectionIndex={sectionIndex}
            key={lessonIndex}
            setSections={setSections}
            lesson={lesson}
            lessonIndex={lessonIndex}
          />
        ))}
      </div>

      {showSectionFormModal && (
        <SectionFormModal
          type="Edit"
          showSectionFormModal={showSectionFormModal}
          setSections={setSections}
          setShowSectionFormModal={setSHowSectionFormModal}
          selectedSection={section}
          sectionIndex={sectionIndex}
        />
      )}

      {showLessonModal && (
        <LessonFormModal
          setShowLessonModal={setShowLessonModal}
          sectionIndex={sectionIndex}
          setSections={setSections}
          showLessonModal={showLessonModal}
          type="Add"
        />
      )}
    </div>
  );
}
export default SectionData;
