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
  createBrand,
  createFabric,
  deleteSubCategory,
  getAllBrands,
  getAllFabric,
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

const Fabric = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [editId, setEditId] = useState("");
  const [brandDatas, setBrandDatas] = useState([]);
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

    setEditId("");
  };

  const handleFinish = async (values) => {
    try {
      setloading(true);
      await createFabric(values);
      handleCancel();
      fetchData();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setloading(false);
    }
  };

  const fetchData = async () => {
    try {
      setloading(true);
      const allBrands = await getAllFabric();
      setBrandDatas(_.get(allBrands, "data.data", []));
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
      render: (value, all, index) => {
        return <span className="!font-Roboto">{index + 1}</span>;
      },
    },
    {
      title: "Brand Name",
      dataIndex: "fabric_name",
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

  return (
    <div className="dashboard_header_div">
      <DashboardHeader
        name="Fabrics"
        Icon={IconHelper.fabricIcon}
        open={open}
        setOpen={setOpen}
        vendorShown={false}
        adminShown={true}
      />

      <div className="w-full h-fit">
        <Table
          loading={loading}
          dataSource={brandDatas}
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
        title={`Add Fabrics`}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="form_bottom_gap"
        >
          <Form.Item
            name="fabric_name"
            rules={[requiredRules("Enter Fabrics Name")]}
            label="Fabrics Name"
          >
            <Input placeholder="Fabrics Name" className="antd_input h-[40px]" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              htmlType="submit"
              block
              className="primary_btn"
            >
              {editId ? "Update" : "Add"} Fabrics
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Fabric;
