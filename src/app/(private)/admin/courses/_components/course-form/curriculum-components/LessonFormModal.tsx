import { Edit2Icon, MoreVertical, Plus, Trash } from "lucide-react";
import { App, Button, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import mediaGlobalStore, { IMediaGlobalStore } from "@/store/media-store";

function LessonFormModal({
  showLessonModal,
  setShowLessonModal,
  sectionIndex,
  selectedLesson,
  lessonIndex,
  setSections,
  type,
}: {
  showLessonModal: boolean;
  setShowLessonModal: (showLessonModal: boolean) => void;
  setSections: (sections: any) => void;
  type: "Add" | "Edit";
  selectedLesson?: any;
  lessonIndex?: number;
  sectionIndex: number;
}) {
  const { message } = App.useApp();
  const [name, setName] = useState("");
  const [media, setMedia] = useState("");

  const { media: mediaStore } = mediaGlobalStore() as IMediaGlobalStore;

  const handleSave = () => {
    try {
      if (type === "Add") {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons.push({
            name,
            media,
          });
          return updatedSections;
        });
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons[lessonIndex!] = {
            name,
            media,
          };
          return updatedSections;
        });
      }

      message.success(type === "Add" ? "Lesson added" : "lesson edited");
      setShowLessonModal(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  //   pre-populating
  useEffect(() => {
    if (type === "Edit") {
      setName(selectedLesson.name);
      setMedia(selectedLesson.media);
    }
  }, []);

  return (
    <Modal
      centered
      footer={null}
      title={type === "Add" ? "Add lesson" : "Edit lesson"}
      open={showLessonModal}
      onCancel={() => setShowLessonModal(false)}
    >
      <div>
        <label htmlFor="name">Lesson name</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter lesson name"
        />
      </div>

      {/* todo */}
      <div className="flex flex-col">
        <label htmlFor="media">Select video</label>
        <Select>
          {mediaStore.map((item: any) => (
            <Select.Option value={item.url} key={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end mt-3 gap-5">
        <Button>Cancel</Button>
        <Button disabled={!name} type="primary" onClick={handleSave}>
          save
        </Button>
      </div>
    </Modal>
  );
}
export default LessonFormModal;
