import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

function DescriptionTab({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={quillModules}
        formats={quillFormats}
        value={description}
        onChange={(newValue) => {
          setDescription(newValue);
          console.log(description);
        }}
      />
    </>
  );
}
export default DescriptionTab;
