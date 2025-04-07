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
  Select,
} from "antd";
import {
  craeteSubCategory,
  createCategory,
  createProductCategory,
  deleteMyCategory,
  deleteProductCategory,
  deleteSubCategory,
  getMyCategory,
  getProductCategory,
  getSubCategory,
  updateCategory,
  updateProductCategory,
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
  getSubCategoryName,
} from "../../../helper/filter_helper";
import { getProductSubCategoryData } from "./specialApi";

// redux
import { useSelector } from "react-redux";
import UploadHelper from "../../../component/UploadHelper";

const ProductCategory = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterSubCategory, setFilterSubCategory] = useState([]);
  const [productCategory, setProductcategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState("");
  let initialImages = {
    url: "",
    path: "",
  };

  const role = useSelector((data) => data);

  const [imgUrl, setImgUrl] = useState(initialImages);

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
      let result;

      const formData = new FormData();
      formData.append("image", imgUrl.path);
      formData.append("category_name", values.category_name);
      formData.append("sub_category_name", values.sub_category_name);
      formData.append(
        "product_category_name",
        firstLettertoCapitalize(values.product_category_name)
      );

      if (_.get(editId, "_id", "")) {
        formData.append("id", _.get(editId, "_id", ""));

        result = await updateProductCategory(formData);
      } else {
        result = await createProductCategory(formData);
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
      const product_category = await getProductSubCategoryData();
      setCategory(_.get(product_category, "[0].data.data", []));
      setSubCategory(_.get(product_category, "[1].data.data", []));
      setProductcategory(_.get(product_category, "[2].data.data", []));
    } catch (e) {
      ErrorNotification(e);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setloading(true);
      const result = await deleteProductCategory(id);
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
    handleCategoryChange(id.category_name, "edit");
    form.setFieldsValue(id);
    setImgUrl((pre) => ({ ...pre, url: id.category_image }));
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      render: (value, all, index) => {
        return <span className="!font-Roboto">{index + 1}</span>;
      },
    },
    {
      title: "Image",
      dataIndex: "product_category_image",
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
      title: "Category",
      dataIndex: "category_name",
      render: (value) => {
        return (
          <span className="">
            {_.get(getCategoryName(value, category), "[0].category_name")}
          </span>
        );
      },
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category_name",
      render: (value) => {
        return (
          <span className="">
            {" "}
            {_.get(
              getCategoryName(value, subCategory),
              "[0].sub_category_name"
            )}
          </span>
        );
      },
    },
    {
      title: "Product Category",
      dataIndex: "product_category_name",
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

  const handleCategoryChange = (value, from) => {
    try {
      const result = subCategory.filter((res) => {
        return res.category_name === value;
      });
      setFilterSubCategory(result);
      if (from !== "edit") {
        form.setFieldsValue({ sub_category_name: "" });
      }
    } catch (err) {}
  };

  return (
    <div className="dashboard_header_div">
      <DashboardHeader
        name="Product Category"
        Icon={IconHelper.productCatIcon}
        open={open}
        setOpen={setOpen}
        vendorShown={false}
        adminShown={true}
      />

      <div className="w-full h-fit">
        <Table
          loading={loading}
          dataSource={productCategory}
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
        title={`Add Product Category`}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="form_bottom_gap"
        >
          <Form.Item
            name="product_category_image"
            label="Product Category Image"
          >
            <UploadHelper
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              form={form}
              box={"product_category_image"}
            />
          </Form.Item>
          <Form.Item
            name="category_name"
            rules={[requiredRules("Select Category Name")]}
            label="Select Category"
          >
            <Select
              className="antd_input h-[40px]"
              onChange={handleCategoryChange}
            >
              {category.map((res, index) => {
                return (
                  <Select.Option value={res._id}>
                    {res.category_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="sub_category_name"
            rules={[requiredRules("Select Sub Category Name")]}
            label="Select Sub Category"
          >
            <Select className="antd_input h-[40px]">
              {filterSubCategory.map((res, index) => {
                return (
                  <Select.Option value={res._id}>
                    {res.sub_category_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="product_category_name"
            rules={[requiredRules("Enter Product Category Name")]}
            label="Product Category Name"
          >
            <Input
              placeholder="Product Category Name"
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
              {editId ? "Update" : "Add"} ProductCategory
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCategory;
