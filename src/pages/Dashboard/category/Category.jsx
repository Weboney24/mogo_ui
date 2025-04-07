import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import {
  Image,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  message,
} from "antd";
import {
  createCategory,
  deleteMyCategory,
  getMyCategory,
  getSubCategory,
  updateCategory,
} from "../../../helper/api_helper";
import _ from "lodash";
import moment from "moment";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  firstLettertoCapitalize,
  requiredRules,
} from "../../../helper/form_validation";
import UploadHelper from "../../../component/UploadHelper";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../helper/notification_helper";
import { getSubCategoryCount } from "../../../helper/filter_helper";
import { getCategoryData } from "./specialApi";

// redux
import { useSelector } from "react-redux";

const Category = () => {
  let initialImages = {
    url: "",
    path: "",
  };

  const role = useSelector((data) => data);

  const [imgUrl, setImgUrl] = useState(initialImages);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [search, setSearch] = useState("all");

  const [columnsData, setColumnsData] = useState([]);

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setImgUrl(initialImages);
    setOpen(false);
    setEditId("");
  };

  const handleFinish = async (values) => {
    try {
      setloading(true);
      if (!imgUrl.url) {
        return message.error("Category image not found");
      }
      const formData = new FormData();
      formData.append("image", imgUrl.path);
      formData.append("display_at", values.display_at);
      formData.append(
        "category_name",
        firstLettertoCapitalize(values.category_name)
      );
      let result;
      if (_.get(editId, "_id", "")) {
        formData.append("id", _.get(editId, "_id", ""));
        result = await updateCategory(formData);
      } else {
        result = await createCategory(formData);
      }

      SuccessNotification(result);
      fetchData();
      handleCancel();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    } finally {
      setloading(false);
    }
  };

  const fetchData = async () => {
    try {
      setloading(true);
      const sub_category = await getCategoryData(search);
      setCategory(_.get(sub_category, "[0].data.data", []));
      setSubCategory(_.get(sub_category, "[1].data.data", []));
    } catch (e) {
      console.log(e);
      ErrorNotification(e);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleDelete = async (id) => {
    try {
      setloading(true);
      const result = await deleteMyCategory(id);
      fetchData();
      SuccessNotification(result);
    } catch (e) {
      ErrorNotification(e);
    } finally {
      setloading(false);
    }
  };

  const handleEdit = async (id) => {
    setEditId(id);
    setOpen(true);
    form.setFieldsValue(id);
    setImgUrl((pre) => ({ ...pre, url: id.category_image }));
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      align: "center",
      render: (value, all, index) => {
        return <span className="!font-Roboto">{index + 1}</span>;
      },
    },
    {
      title: "Image",
      dataIndex: "category_image",
      render: (value) => {
        return (
          <Image
            src={value}
            className="!size-[50px] !rounded-lg !shadow-inner"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "category_name",
      render: (value) => {
        return <span className="">{value}</span>;
      },
    },
    {
      title: "Sub Category",
      align: "center",
      dataIndex: "_id",
      render: (value) => {
        return <Tag>{getSubCategoryCount(value, subCategory)?.length}</Tag>;
      },
    },
    {
      title: "Display Position",
      dataIndex: "display_at",
      render: (value) => {
        return <span className="">{value}</span>;
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (value) => {
        return moment(value).format("LLLL");
      },
    },
    {
      title: "Actions",
      align: "end",
      render: (value) => {
        return (
          <div className="center_div justify-end gap-x-2">
            <Tag className="!size-[30px] !center_div !bg-white !shadow-inner !text-green-500 !cursor-pointer">
              <EditFilled
                onClick={() => {
                  handleEdit(value);
                }}
              />
            </Tag>
            <Tag className="!size-[30px] !center_div !bg-white !shadow-inner !text-red-400 !cursor-pointer">
              <DeleteFilled
                onClick={() => {
                  handleDelete(value._id);
                }}
              />
            </Tag>
          </div>
        );
      },
    },
  ];

  const handleSearchChange = (value) => {
    setSearch(value.target.value || "all");
  };

  return (
    <div className="dashboard_header_div">
      <DashboardHeader
        name="Category"
        Icon={IconHelper.catIocn}
        open={open}
        setOpen={setOpen}
        vendorShown={false}
        adminShown={true}
      />
      <div>
        <Input
          placeholder="Search Category"
          onChange={handleSearchChange}
          className="antd_input w-[300px] h-[40px]"
        />
      </div>
      <div className="w-full h-fit">
        <Table
          loading={loading}
          dataSource={category}
          columns={
            _.get(role, "role.currentRole.role", "") === "vendor"
              ? columns.filter((res) => {
                  return res.title !== "Actions";
                })
              : columns
          }
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          className="!shadow-inner"
        />
      </div>
      <Modal
        open={open}
        footer={false}
        onCancel={handleCancel}
        title={`Add Category`}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="form_bottom_gap"
        >
          <Form.Item name="category_image" label="Category Image">
            <UploadHelper
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              form={form}
              box={"category_image"}
            />
          </Form.Item>
          <Form.Item
            name="category_name"
            rules={[requiredRules("Enter Category Name")]}
            label="Category Name"
          >
            <Input
              placeholder="Category Name"
              className="antd_input h-[40px]"
            />
          </Form.Item>
          <Form.Item
            name="display_at"
            rules={[requiredRules("Enter Display Position")]}
            label="Display Position"
          >
            <Input
              type="number"
              placeholder="Display Position"
              className="antd_input h-[40px]"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              htmlType="submit"
              block
              className="primary_btn"
            >
              {editId ? "Update" : "Add"} Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
