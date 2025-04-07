/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { Button, Form, Input, Select, Table } from "antd";
import { requiredRules } from "../../../helper/form_validation";

import {
  addNewDeliveryTiming,
  getDeliveryLocations,
} from "../../../helper/api_helper";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../helper/notification_helper";
import _ from "lodash";

const DeliveryLocations = () => {
  const [open, setOpen] = useState();

  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const [currentDay, setCurrentDay] = useState("Days");

  const handleFinish = async (values) => {
    try {
      values.timing_type = currentDay;
      const result = await addNewDeliveryTiming(values);
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
      setCurrentDay("Days");
    } catch (err) {}
  };

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const result = await getDeliveryLocations();
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
      title: "Kilometer",
      width: 200,
      align: "center",
      dataIndex: "kilo_meter",
      render: (name) => {
        return <h1>{name}&nbsp;KM</h1>;
      },
    },
    {
      title: "Duration",
      dataIndex: "delivery_timing",
      width: 200,
      align: "center",
      render: (name, alldata) => {
        console.log(alldata);
        return (
          <h1>
            {name}&nbsp;{alldata?.timing_type}
          </h1>
        );
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
        name="Delivery Timing"
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
              label="Enter Kilometer"
              name="kilo_meter"
              rules={[requiredRules("Enter kilometer")]}
            >
              <Input
                placeholder="Enter Kilometer"
                type="number"
                className="antd_input2"
              />
            </Form.Item>
            <Form.Item
              label="Enter Delivery Timing"
              name="delivery_timing"
              rules={[requiredRules("Enter Delivery Timing")]}
            >
              <Input
                placeholder="Enter Delivery Timing"
                className="!antd_input2 !w-[300px] !h-[50px]"
                type="number"
                addonAfter={
                  <Select
                    className="w-[100px]"
                    defaultValue={currentDay}
                    onChange={(e) => {
                      setCurrentDay(e);
                    }}
                  >
                    <Select.Option value={"Days"}>Days</Select.Option>
                    <Select.Option value={"Hours"}>Hours</Select.Option>
                  </Select>
                }
              />
            </Form.Item>
            <Form.Item className=" !w-full">
              <Button
                htmlType="submit"
                className="primary_btn h-[30px] w-fit px-10"
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

export default DeliveryLocations;
