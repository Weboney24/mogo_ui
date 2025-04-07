/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";

import {
  Image,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Button,
  message,
  Select,
} from "antd";
import {
  craeteSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../../../helper/api_helper";
import _ from "lodash";
import moment from "moment";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  firstLettertoCapitalize,
  requiredRules,
} from "../../../helper/form_validation";

import {
  ErrorNotification,
  SuccessNotification,
} from "../../../helper/notification_helper";
import {
  getCategoryName,
  getProductCategoryCount,
} from "../../../helper/filter_helper";
import { getSubCategoryData } from "./specialApi";

// redux
import { useSelector } from "react-redux";
import { IconHelper } from "../../../helper/IconHelper";
import UploadHelper from "../../../component/UploadHelper";

const Subcategory = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState("");
  const [productCategory, setProductcategory] = useState([]);
  const [search, setSearch] = useState("all");
  const [filter, setFilter] = useState("no");

  const role = useSelector((data) => data);

  let initialImages = {
    url: "",
    path: "",
  };

  const [imgUrl, setImgUrl] = useState(initialImages);

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setImgUrl(initialImages);
    setEditId("");
  };

  const handleFinish = async (values) => {
    try {
      if (!imgUrl.url) {
        return message.error("Sub Category image not found");
      }
      setloading(true);
      const formData = new FormData();
      formData.append("image", imgUrl.path);
      formData.append("category_name", values.category_name);
      formData.append(
        "sub_category_name",
        firstLettertoCapitalize(values.sub_category_name)
      );
      let result;

      if (_.get(editId, "_id", "")) {
        formData.append("id", _.get(editId, "_id", ""));

        result = await updateSubCategory(formData);
      } else {
        result = await craeteSubCategory(formData);
      }
      SuccessNotification(result);
      fetchData();
      handleCancel();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setloading(false);
    }
  };

  const fetchData = async () => {
    try {
      setloading(true);
      const sub_category = await getSubCategoryData(search, filter);
      console.log({ sub_category });
      setCategory(_.get(sub_category, "[0].data.data", []));
      setSubCategory(_.get(sub_category, "[1].data.data", []));
      setProductcategory(_.get(sub_category, "[2].data.data", []));
    } catch (e) {
      ErrorNotification(e);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, filter]);

  const handleDelete = async (id) => {
    try {
      setloading(true);
      const result = await deleteSubCategory(id);
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
    setImgUrl((pre) => ({ ...pre, url: id.sub_category_image }));
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
      dataIndex: "sub_category_image",
      render: (value) => {
        return (
          value && (
            <Image
              src={value}
              className="!size-[50px] !rounded-lg !shadow-inner"
            />
          )
        );
      },
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category_name",
      render: (value) => {
        return <span className="">{value}</span>;
      },
    },
    {
      title: "Product Category",
      align: "center",
      dataIndex: "_id",
      render: (value) => {
        return (
          <Tag>{getProductCategoryCount(value, productCategory)?.length}</Tag>
        );
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
      title: "Category",
      dataIndex: "category_name",
      render: (value) => {
        return (
          <span className="">
            {_.get(getCategoryName(value, category), "[0].category_name", "")}
          </span>
        );
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
        name="Subcategory"
        Icon={IconHelper.subCatIcons}
        open={open}
        setOpen={setOpen}
        vendorShown={false}
        adminShown={true}
      />
      <div className="flex items-center gap-x-2">
        <Input
          placeholder="Search Sub Category"
          onChange={handleSearchChange}
          className="antd_input w-[300px] h-[40px]"
        />
        <Select
          className="antd_input h-[40px] w-[200px]"
          placeholder="Filter by category"
          allowClear
          onChange={(e) => {
            setFilter(e || "no");
          }}
        >
          {category.map((res, index) => {
            return (
              <Select.Option key={index} value={res._id}>
                {res.category_name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className="w-full h-fit">
        <Table
          loading={loading}
          dataSource={subCategory}
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
        title={`Add Sub Category`}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="form_bottom_gap"
        >
          <Form.Item name="sub_category_image" label="Sub Category Image">
            <UploadHelper
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              form={form}
              box={"sub_category_image"}
            />
          </Form.Item>
          <Form.Item
            name="category_name"
            rules={[requiredRules("Enter Category Name")]}
            label="Select Category"
          >
            <Select className="antd_input h-[40px]">
              {category.map((res, index) => {
                return (
                  <Select.Option key={index} value={res._id}>
                    {res.category_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="sub_category_name"
            rules={[requiredRules("Enter Sub Category Name")]}
            label="Sub Category Name"
          >
            <Input
              placeholder="Sub Category Name"
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
              {editId ? "Update" : "Add"} Subcategory
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Subcategory;
