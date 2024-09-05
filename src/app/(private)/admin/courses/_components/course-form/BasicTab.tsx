import { Button, Form, Input, Select, Upload, UploadFile } from "antd";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

const categories = [
  { label: "Web Development", value: "web-development" },
  { label: "Mobile Apps", value: "app-development" },
  { label: "FrontEnd Development", value: "frontend-development" },
  { label: "Backend Development", value: "backend-development" },
  { label: "Data Science", value: "data-science" },
  { label: "Machine Learning", value: "machine-learning" },
];

function BasicTab({
  promoVideo,
  setPromoVideo,
  coverImage,
  setCoverImage,
}: {
  promoVideo: File | null;
  setPromoVideo: (file: File) => void;
  coverImage: File | null;
  setCoverImage: (file: File) => void;
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <div className="flex flex-col ">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter course" }]}
      >
        <Input placeholder="Enter course title" />
      </Form.Item>
      <Form.Item
        label="Subtitle"
        name="subtitle"
        rules={[{ required: true, message: "Please enter course subtitle" }]}
      >
        <Input.TextArea placeholder="Enter course subtitle title" />
      </Form.Item>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Enter course price" }]}
        >
          <Input placeholder="Enter course price" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Enter course price" }]}
        >
          <Select placeholder="Enter course category">
            {categories.map((cat) => (
              <Select.Option key={cat.value} value={cat.value}>
                {cat.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item name="coverImage" label="Cover Image">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              setCoverImage(file);
              return false;
            }}
          >
            <span className="text-sm">Upload an image</span>
          </Upload>
        </Form.Item>

        <Form.Item name="promoVideo" label="Promo Video">
          <Upload
            accept="video/*"
            fileList={fileList}
            listType="picture-card"
            beforeUpload={(file) => {
              setPromoVideo(file);
              return false;
            }}
          >
            <span className="text-sm">Upload a video</span>
          </Upload>
        </Form.Item>
      </div>
    </div>
  );
}
export default BasicTab;
