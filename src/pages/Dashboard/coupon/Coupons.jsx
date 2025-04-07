import { useEffect, useState } from "react";
import { IconHelper } from "../../../helper/IconHelper";
import DashboardHeader from "../../../component/DashboardHeader";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Switch,
  Table,
  Tag,
} from "antd";
import { requiredRules } from "../../../helper/form_validation";
import {
  ErrorNotification,
  successMessage,
  SuccessNotification,
} from "../../../helper/notification_helper";
import {
  createCoupons,
  deleteCoupon,
  getAllCoupon,
  updateCoupon,
} from "../../../helper/api_helper";
import _ from "lodash";
import moment from "moment";
import ExpiredUiHelper from "../../../component/ExpiredUiHelper";
import dayjs from "dayjs";

const Coupons = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrent] = useState(false);
  const [couponData, setCouponData] = useState([]);

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      if (currentId) {
        await updateCoupon(values, currentId);
      } else {
        await createCoupons(values);
      }
      successMessage(
        `Coupon ${currentId ? "Updated" : "Created"} successfully`
      );
      fetchData();
      handleCancel();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setCurrent("");
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllCoupon();
      setCouponData(_.get(result, "data.data", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (value) => {
    try {
      const result = await deleteCoupon(value._id);
      SuccessNotification(result);
      fetchData();
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handleEdit = (value) => {
    try {
      console.log(value);
      setCurrent(value._id);
      value.coupon_expires = dayjs(value.coupon_expires, "DD/MM/HH-hh:mm:ss a");
      form.setFieldsValue(value);
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "S.No",
      render: (data, allData, index) => {
        return <h1>{index + 1}</h1>;
      },
    },
    {
      title: "Coupon Name",
      dataIndex: "coupon_name",
    },
    {
      title: "Coupon Code",
      dataIndex: "coupon_code",
      render: (value) => {
        return (
          <Tag className="bg-secondary text-white tracking-wider">{value}</Tag>
        );
      },
    },
    {
      title: "Coupon Discount %",
      dataIndex: "coupon_discount",
    },
    {
      title: "Active Status",
      dataIndex: "coupon_status",
      align: "center",
      render: (value) => {
        return value ? (
          <h1 className="text-secondary">Active</h1>
        ) : (
          <h1 className="text-gray-200">In-Active</h1>
        );
      },
    },
    {
      title: "Expired Status",
      dataIndex: "coupon_expires",
      render: (value) => {
        return moment(value).format("") < moment(Date.now()).format("") ? (
          <h1 className="text-gray-200">Expired</h1>
        ) : (
          <h1>
            <ExpiredUiHelper date={value} />
          </h1>
        );
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (value) => {
        return (
          <div className="center_div gap-4">
            <IconHelper.EditIcon
              className="cursor-pointer text-xl"
              onClick={() => {
                handleEdit(value);
              }}
            />
            <IconHelper.DeleteIcon
              className="cursor-pointer text-xl"
              onClick={() => {
                handleDelete(value);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Coupons"
        Icon={IconHelper.couponIcon}
        vendorShown={false}
        adminShown={true}
        open={open}
        setOpen={setOpen}
      />
      <div className="w-full h-fit">
        <Table
          loading={loading}
          dataSource={couponData}
          columns={columns}
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          className="!shadow-inner"
        />
      </div>
      <Modal
        className="!min-w-[400px] !px-10"
        open={open}
        footer={false}
        destroyOnClose
        title={`${currentId ? "Update" : "Create"} Coupon`}
        closable={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          className="flex  gap-y-3 y-2  flex-col"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Coupon Name"
            name="coupon_name"
            rules={[requiredRules("Enter coupon name")]}
          >
            <Input
              placeholder="Enter coupon name"
              className="antd_input2 w-[400px]"
            />
          </Form.Item>
          <Form.Item
            label="Coupon Code"
            name="coupon_code"
            rules={[requiredRules("Enter coupon Code")]}
          >
            <Input
              placeholder="Enter coupon Code"
              className="antd_input2 w-[400px]"
            />
          </Form.Item>
          <Form.Item
            label="Coupon Discount %"
            name="coupon_discount"
            rules={[requiredRules("Enter coupon %")]}
          >
            <Input
              type="number"
              suffix="%"
              placeholder="Enter coupon %"
              className="antd_input2 w-[400px]"
            />
          </Form.Item>

          <Form.Item
            label="Coupon Expires"
            name="coupon_expires"
            rules={[requiredRules("Select coupon Expire Date")]}
          >
            <DatePicker
              showTime
              format={"DD/MM/HH-hh:mm:ss a"}
              className="antd_input2 w-[400px]"
            />
          </Form.Item>
          <Form.Item
            label="Coupon Status"
            name="coupon_status"
            rules={[requiredRules("Select coupon status")]}
            initialValue={true}
          >
            <Switch defaultChecked={true} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="primary_btn">
              {currentId ? "Update" : "Create"} Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Coupons;
