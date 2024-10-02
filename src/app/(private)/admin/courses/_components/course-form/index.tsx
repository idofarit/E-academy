"use client";

import { uploadFileToFirebaseAndReturnUrl } from "@/helpers/firebase-upload";
import { createCourse, editCourse } from "@/server-actions/courses";
import { getAllMedia } from "@/server-actions/media-library";
import mediaGlobalStore, { IMediaGlobalStore } from "@/store/media-store";
import { App, Button, Form, Tabs, TabsProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import BasicTab from "./BasicTab";
import CurriculumTab from "./CurriculumTab";
import DescriptionTab from "./DescriptionTab";

function CourseForm({
  type = "add",
  courseData = {},
}: {
  courseData?: any;
  type?: "edit" | "add";
}) {
  const router = useRouter();

  const { message } = App.useApp();

  const [activeTab, setActiveTab] = React.useState("1");

  const [description, setDescription] = React.useState(
    courseData?.description || ""
  );

  const [sections, setSections] = React.useState<any[]>(
    courseData?.sections || []
  );

  const [coverImage, setCoverImage] = React.useState<File | null | string>(
    courseData?.coverImage || null
  );

  const [promoVideo, setPromoVideo] = React.useState<File | null | string>(
    courseData?.promoVideo || null
  );

  const [loading, setLoading] = React.useState(false);

  const { setMedia } = mediaGlobalStore() as IMediaGlobalStore;

  const onFinish = async (formValues: any) => {
    try {
      setLoading(true);
      const payload = {
        ...formValues,
        coverImage,
        promoVideo,
        description,
        sections,
      };

      if (coverImage && typeof coverImage === "object") {
        payload.coverImage = await uploadFileToFirebaseAndReturnUrl(coverImage);
      }
      if (promoVideo && typeof promoVideo === "object") {
        payload.promoVideo = await uploadFileToFirebaseAndReturnUrl(promoVideo);
      }

      let response: any = null;

      if (type === "edit") {
        response = await editCourse(courseData._id, payload);
      } else {
        response = await createCourse(payload);
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/courses");
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error("failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await getAllMedia();
      if (response.success) {
        setMedia(response.data);
      } else {
        setMedia([]);
      }
    } catch (error: any) {
      setMedia([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Basic",
      children: (
        <BasicTab
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          promoVideo={promoVideo}
          setPromoVideo={setPromoVideo}
        />
      ),
    },
    {
      key: "2",
      label: "Desciption",
      children: (
        <DescriptionTab
          description={description}
          setDescription={setDescription}
        />
      ),
    },
    {
      key: "3",
      label: "Curriculum",
      children: <CurriculumTab sections={sections} setSections={setSections} />,
    },
  ];

  return (
    <div className="mt-7">
      <Form onFinish={onFinish} layout="vertical" initialValues={courseData}>
        <Tabs
          items={items}
          activeKey={activeTab}
          defaultActiveKey="1"
          onTabClick={(key) => setActiveTab(key)}
        ></Tabs>

        <div className="flex justify-end gap-5 mt-5">
          <Button
            disabled={loading}
            onClick={() => router.push("/admin/courses")}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default CourseForm;
