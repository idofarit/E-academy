"use client";

import { Form, Tabs, TabsProps } from "antd";
import { useState } from "react";
import BasicTab from "./BasicTab";
import DescriptionTab from "./DescriptionTab";
import CurriculumTab from "./CurriculumTab";

function CourseForm() {
  const [activeTab, setActiveTab] = useState("1");

  const [description, setDescription] = useState("");

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [promoVideo, setPromoVideo] = useState<File | null>(null);

  const onFinish = (formValues: any) => {
    console.log(formValues);
  };

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
      children: <CurriculumTab />,
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
