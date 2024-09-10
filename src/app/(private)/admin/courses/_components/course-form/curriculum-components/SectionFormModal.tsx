import { App, Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";

function SectionFormModal({
  showSectionFormModal,
  setShowSectionFormModal,
  type = "Add",
  setSections,
  selectedSection,
  sectionIndex,
}: {
  showSectionFormModal: boolean;
  setShowSectionFormModal: (showSectionModal: boolean) => void;
  type?: "Add" | "Edit";
  setSections: (sections: any) => void;
  selectedSection?: any;
  sectionIndex?: number;
}) {
  const [name, setName] = useState("");
  const { message } = App.useApp();

  const handleSave = () => {
    try {
      if (type === "Add") {
        setSections((prev: any) => [...prev, { name, lessons: [] }]);
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex!] = {
            ...updatedSections[sectionIndex!],
            name,
          };
          return updatedSections;
        });
      }
      setName("");
      setShowSectionFormModal(!showSectionFormModal);
      message.success(type === "Add" ? "Section added" : "Section updated");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (type === "Edit") setName(selectedSection?.name);
  }, []);

  return (
    <Modal
      footer={null}
      centered
      title={type === "Add" ? "Add section" : "Edit section"}
      onCancel={() => setShowSectionFormModal(!showSectionFormModal)}
      open={showSectionFormModal}
    >
      <div>
        <label htmlFor="name">Section name</label>
        <Input
          className="mt-2"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2 p-2">
        <Button
          disabled={!name}
          onClick={handleSave}
          className=" bg-btn-active text-white border-none"
        >
          Add
        </Button>
        <Button
          onClick={() => {
            setShowSectionFormModal(!showSectionFormModal);
            setName("");
          }}
          className=" text-form-btn-active"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
export default SectionFormModal;
