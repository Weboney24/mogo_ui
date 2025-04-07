/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { Button, Form, Input, Table } from "antd";
import { requiredRules } from "../../../helper/form_validation";

import {
  addNewDeliveryCharge,
  getDeliveryCharges,
  getDeliveryLocations,
} from "../../../helper/api_helper";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../helper/notification_helper";
import _ from "lodash";

const DeliveryCharge = () => {
  const [open, setOpen] = useState();

  const [deliveryLocations, setDeliveryLocations] = useState([]);

  const handleFinish = async (values) => {
    try {
      const result = await addNewDeliveryCharge(values);
      fetchData();
      handleCancel();
      SuccessNotification(result);
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handleCancel = () => {
    try {
      form.resetFields();
      setOpen(false);
    } catch (err) {}
  };

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const result = await getDeliveryCharges();
      setDeliveryLocations(_.get(result, "data.data", []));
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "S.No",
      align: "center",
      width: 100,
      render: (data, all, index) => {
        return <h1 className="font-bold text-center">{index + 1}</h1>;
      },
    },
    {
      title: "Weight",
      width: 200,
      align: "center",
      dataIndex: "product_weight",
      render: (name) => {
        return <h1>{name}&nbsp;KG</h1>;
      },
    },
    {
      title: "Delivery Charge",
      dataIndex: "delivery_charge",
      width: 200,
      align: "center",
      render: (name, alldata) => {
        return <h1> ₹&nbsp;{Number(name).toLocaleString()}</h1>;
      },
    },
    {
      title: "Edit",
      dataIndex: "_id",
      fixed: "right",
      width: 100,
      render: (name, alldata) => {
        return (
          <IconHelper.EditIcon className="!cursor-pointer hover:!text-secondary !text-xl" />
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "_id",
      fixed: "right",
      width: 100,
      render: (name, alldata) => {
        console.log(alldata);
        return (
          <IconHelper.DeleteIcon className="!cursor-pointer hover:!text-primary !text-xl" />
        );
      },
    },
  ];

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Delivery Charge"
        Icon={IconHelper.deliveryLocation}
        vendorShown={false}
        adminShown={true}
        open={open}
        setOpen={setOpen}
        cancel={true}
        handleCancel={handleCancel}
      />
      <div
        className={`w-full bg-white min-h-[100px] rounded-lg ${open && "p-10"}`}
      >
        {!open ? (
          <Table
            rowKey={(data) => {
              return data._id;
            }}
            dataSource={deliveryLocations}
            columns={columns}
          />
        ) : (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            form={form}
            className="flex flex-col gap-y-2"
          >
            <Form.Item
              label="Enter Weight (KG)"
              name="product_weight"
              rules={[requiredRules("Enter Weight")]}
            >
              <Input
                placeholder="Enter Weight (KG)"
                type="number"
                className="antd_input2"
                suffix="KG"
              />
            </Form.Item>
            <Form.Item
              label="Enter Charge"
              name="delivery_charge"
              rules={[requiredRules("Enter Delivery Charge")]}
            >
              <Input
                placeholder="Enter Delivery Charge"
                className="!antd_input2 !w-[300px] "
                type="number"
                prefix="₹"
              />
            </Form.Item>
            <Form.Item className=" !w-full">
              <Button
                htmlType="submit"
                className="primary_btn h-[40px] w-fit px-10"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default DeliveryCharge;
