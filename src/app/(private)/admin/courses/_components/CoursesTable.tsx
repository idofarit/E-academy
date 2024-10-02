"use client";

import { getDateTimeFormat } from "@/helpers/date-time-format";
import { ICourse } from "@/interfaces";
import { deleteCourse } from "@/server-actions/courses";
import { App, Button, Table, Tooltip } from "antd";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function CoursesTable({ courses }: { courses: ICourse[] }) {
  const { message } = App.useApp();

  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>();

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteCourse(id);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => category.toUpperCase(),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text: string, record: ICourse) => (
        <div className="flex gap-5 justify-center">
          <Button size="small" onClick={() => handleDelete(record._id)}>
            <Trash2 size={14} />
          </Button>

          <Tooltip title="Edit">
            <Button
              size="small"
              onClick={() => {
                router.push(`/admin/courses/edit/${record._id}`);
              }}
            >
              <Edit2 size={14} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowKey={(record) => record._id}
        dataSource={courses}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}
export default CoursesTable;
