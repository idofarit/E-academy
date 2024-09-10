import { Button } from "antd";
import { useState } from "react";
import SectionFormModal from "./curriculum-components/SectionFormModal";
import SectionData from "./curriculum-components/SectionData";

function CurriculumTab({
  sections,
  setSections,
}: {
  sections: any[];
  setSections: (sections: any[]) => void;
}) {
  const [showSectionFormModal, setShowSectionFormModal] = useState(false);

  const handleAddSection = () => {
    setShowSectionFormModal(!showSectionFormModal);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={handleAddSection}
          className="bg-btn-active text-white border-none"
        >
          Add section
        </Button>
      </div>

      <div className="flex flex-col gap-5 mt-3">
        {sections.map((section, index) => (
          <SectionData
            sectionIndex={index}
            key={index}
            section={section}
            setSections={setSections}
          />
        ))}
      </div>

      {showSectionFormModal && (
        <SectionFormModal
          setSections={setSections}
          showSectionFormModal={showSectionFormModal}
          setShowSectionFormModal={setShowSectionFormModal}
        />
      )}
    </>
  );
}
export default CurriculumTab;
