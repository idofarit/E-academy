"use client";

import { Form, Tabs, TabsProps } from "antd";
import React, { useEffect } from "react";
import BasicTab from "./BasicTab";
import CurriculumTab from "./CurriculumTab";
import DescriptionTab from "./DescriptionTab";
import mediaGlobalStore, { IMediaGlobalStore } from "@/store/media-store";
import { getAllMedia } from "@/server-actions/media-library";

function CourseForm() {
  const [activeTab, setActiveTab] = React.useState("1");

  const [description, setDescription] = React.useState("");

  const [sections, setSections] = React.useState<any>([]);

  const [coverImage, setCoverImage] = React.useState<File | null>(null);

  const [promoVideo, setPromoVideo] = React.useState<File | null>(null);

  const { setMedia } = mediaGlobalStore() as IMediaGlobalStore;

  const onFinish = (formValues: any) => {
    console.log(formValues);
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
      <Form onFinish={onFinish} layout="vertical">
        <Tabs
          items={items}
          activeKey={activeTab}
          defaultActiveKey="1"
          onTabClick={(key) => setActiveTab(key)}
        ></Tabs>
      </Form>
    </div>
  );
}
export default CourseForm;
