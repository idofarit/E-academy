import { Input, Select, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";

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
  promoVideo: File | null | string;
  setPromoVideo: (file: File) => void;
  coverImage: File | null | string;
  setCoverImage: (file: File) => void;
}) {
  let fileListOfCoverImage: any[] = [];
  if (coverImage && typeof coverImage === "string") {
    fileListOfCoverImage = [
      {
        uid: coverImage,
        name: coverImage,
        url: coverImage,
        type: "image/jpeg",
      },
    ];
  }
  if (coverImage && typeof coverImage === "object") {
    fileListOfCoverImage = [
      {
        ...coverImage,
        url: URL.createObjectURL(coverImage),
      },
    ];
  }

  let fileListOfPromoVideo: any[] = [];
  if (promoVideo && typeof promoVideo === "string") {
    fileListOfPromoVideo = [
      {
        uid: promoVideo,
        name: "video.mp4",
        url: promoVideo,
      },
    ];
  }

  if (promoVideo && typeof promoVideo === "object") {
    fileListOfPromoVideo = [
      {
        ...promoVideo,
        url: URL.createObjectURL(promoVideo),
      },
    ];
  }

  return (
    <div className="flex flex-col ">
      <FormItem
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter course" }]}
      >
        <Input placeholder="Enter course title" />
      </FormItem>
      <FormItem
        label="Subtitle"
        name="subTitle"
        rules={[{ required: true, message: "Please enter course subtitle" }]}
      >
        <Input.TextArea placeholder="Enter course subtitle title" />
      </FormItem>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FormItem
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter course price" }]}
        >
          <Input placeholder="Enter course price" type="number" />
        </FormItem>
        <FormItem
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
        </FormItem>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <FormItem name="coverImage" label="Cover Image">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileListOfCoverImage}
            beforeUpload={(file) => {
              setCoverImage(file);
              return false;
            }}
          >
            <span className="text-sm">Upload an image</span>
          </Upload>
        </FormItem>

        <FormItem name="promoVideo" label="Promo Video">
          <Upload
            accept="video/*"
            fileList={fileListOfPromoVideo}
            listType="picture-card"
            beforeUpload={(file) => {
              setPromoVideo(file);
              return false;
            }}
          >
            <span className="text-sm">Upload a video</span>
          </Upload>
        </FormItem>
      </div>
    </div>
  );
}
export default BasicTab;
