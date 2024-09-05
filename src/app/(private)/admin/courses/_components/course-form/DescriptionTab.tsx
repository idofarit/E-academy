import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function DescriptionTab({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  return (
    // <div>
    //   <ReactQuill theme="snow" value={description} onChange={setDescription} />
    // </div>
    <div>
      <h1>Description Tab</h1>
    </div>
  );
}
export default DescriptionTab;
