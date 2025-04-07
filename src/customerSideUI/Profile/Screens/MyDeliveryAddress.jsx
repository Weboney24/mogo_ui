import { useEffect, useState } from "react";
import {
  ErrorNotification,
  SuccessNotification,
  successMessage,
} from "../../../helper/notification_helper";
import {
  addDeliveryAddress,
  deleteMydeliveryAddress,
  getMyDeliveryAddress,
} from "../../../helper/api_helper";
import DeliveryAddress from "../../Checkout/DeliveryAddress";
import _ from "lodash";
import { Button, Drawer, Form, Input, Select, Spin } from "antd";
import { emailRules, requiredRules } from "../../../helper/form_validation";

const MyDeliveryAddress = () => {
  const [allDeliveryAddress, setAllDeliveryAddress] = useState([]);

  const [deliveryAddress, setDeliveryAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyDeliveryAddress();
      setAllDeliveryAddress(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      addDeliveryAddress(values);
      successMessage("Delivery Address Added Successfully");
      fetchData();
      handleClose();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (values) => {
    console.log(values)
    try {
      setLoading(false);
      await deleteMydeliveryAddress(values);
      fetchData();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDeliveryAddress(false);
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <div className="flex items-center justify-between">
        <h1 className="font-Poppins">My Delivery Address</h1>{" "}
        <h1
          className="font-Poppins text-secondary cursor-pointer"
          onClick={() => {
            setDeliveryAddress(true);
          }}
        >
          Add
        </h1>
      </div>
      <div className="flex flex-wrap">
        {allDeliveryAddress.map((res, index) => {
          return (
            <DeliveryAddress
              res={res}
              key={index}
              solo={true}
              edit={true}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <Drawer
        open={deliveryAddress}
        onClose={handleClose}
        closable={false}
        title="Add DeliveryAddress"
      >
        <Form
          layout="vertical"
          className="!flex !flex-col gap-y-4"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Full Name"
            className="w-[300px]"
            name="full_name"
            rules={[requiredRules("Enter Full Name")]}
          >
            <Input placeholder="Name" className="antd_input2" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            className="w-[300px]"
            name="phone_number"
            rules={[requiredRules("Enter Phone Number")]}
          >
            <Input
              minLength={10}
              maxLength={10}
              type="number"
              placeholder="Phone Number"
              className="antd_input2"
            />
          </Form.Item>
          <Form.Item
            label="Alternate Phone Number"
            className="w-[300px]"
            name="alternate_phone_number"
            rules={[requiredRules("Enter Alternate Phone Number")]}
          >
            <Input
              minLength={10}
              maxLength={10}
              type="number"
              placeholder="Phone Number"
              className="antd_input2"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            className="w-[300px]"
            name="address"
            rules={[requiredRules("Enter Full Address")]}
          >
            <Input.TextArea
              cols={4}
              placeholder="Address"
              className="antd_input2 !h-[100px]"
            />
          </Form.Item>
          <Form.Item
            label="District"
            className="w-[300px]"
            name="district"
            rules={[requiredRules("Enter District")]}
          >
            <Input placeholder="District" className="antd_input2" />
          </Form.Item>
          <Form.Item
            label="Zipcode"
            className="w-[300px]"
            name="pincode"
            rules={[requiredRules("Enter Zipcode")]}
          >
            <Input
              minLength={6}
              maxLength={6}
              type="number"
              placeholder="Zipcode"
              className="antd_input2"
            />
          </Form.Item>
          <Form.Item
            label="Address Type"
            className="w-[300px]"
            name="address_name"
            rules={[requiredRules("Select Address Type")]}
          >
            <Select placeholder="Select Address Type" className="antd_input2">
              <Select.Option value={"home"}>Home Address</Select.Option>
              <Select.Option value={"office"}>Office Address</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="antd_input2 bg-secondary text-white font-Poppins mt-4"
            >
              Save Address
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Spin>
  );
};

export default MyDeliveryAddress;
