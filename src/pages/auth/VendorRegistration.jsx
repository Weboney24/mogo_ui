// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { IconHelper } from "../../helper/IconHelper";
import { Form, Input, Button, notification } from "antd";
import { getZipCodeAddress, registerVendor } from "../../helper/api_helper";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { emailRules, requiredRules } from "../../helper/form_validation";

const VendorRegistration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("vendor_token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleFinish = async (values) => {
    console.log("enter", values);
    try {
      setLoading(true);
      await registerVendor(values);
      form.resetFields();
      navigate("/vendor_signin");
      notification.success({ message: "Vendor registration completed" });
    } catch (err) {
      console.log(err);
      if (_.get(err, "response.data.message", "") === "11000") {
        return notification.error({
          message: "The email provided has already been utilized by someone else.",
        });
      }
      notification.error({ message: "Vendor registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleZipCodeChange = async (e) => {
    try {
      let value = e.target.value;
      if (value.length === 6) {
        const result = await getZipCodeAddress({ code: e.target.value });
        form.setFieldsValue({
          latitude: _.get(result, "data.data[0].latitude", ""),
          longitude: _.get(result, "data.data[0].latitude", ""),
          address: _.get(result, "data.data[0].formattedAddress", ""),
          country: _.get(result, "data.data[0].country", ""),
          state: _.get(result, "data.data[0].state", ""),
        });
        setDummy(!dummy);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[95%] border h-auto bg-white m-auto px-5 md:px-10 py-10">
      <div className="center_div justify-start gap-x-2 pt-10">
        <Link to="/vendor_signin">
          <IconHelper.BackIcon />
        </Link>
        <h1 className="heading_text_2xl center_div justify-start gap-x-2">
          <IconHelper.storeIcon /> Vendor Registration Form
        </h1>
      </div>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        className="w-full h-auto pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
      >
        <Form.Item
          className="form_item"
          label="First Name"
          name="first_name"
          rules={[requiredRules("Please Enter First Name")]}
        >
          <Input className="antd_input" placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Last Name"
          name="last_name"
          rules={[requiredRules("Please Enter Last Name")]}
        >
          <Input className="antd_input" placeholder="Enter Last Name" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Company Name"
          name="company_name"
          rules={[requiredRules("Please Enter Company Name")]}
        >
          <Input className="antd_input" placeholder="Enter Company Name" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Email"
          name="email"
          rules={emailRules}
        >
          <Input className="antd_input" placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: "Please Enter Phone Number" }]}
        >
          <Input className="antd_input" placeholder="Enter Phone Number" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Password"
          name="password"
          rules={[requiredRules("Please Enter Password")]}
        >
          <Input.Password className="antd_input" placeholder="Enter Password" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Confirm Password"
          name="confirm_password"
          rules={[{ required: true, message: "Please Enter Confirm Password" }]}
        >
          <Input.Password className="antd_input" placeholder="Enter Confirm Password" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="GSTN"
          name="GSTN"
          rules={[requiredRules("Please Enter GSTN")]}
        >
          <Input className="antd_input" placeholder="Enter GSTN" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Zipcode"
          name="zipcode"
          rules={[
            { required: true, message: "Please Enter Zipcode" },
            { max: 6, min: 6, message: "Please enter a valid zipcode" },
          ]}
        >
          <Input
            maxLength={6}
            minLength={6}
            type="number"
            className="antd_input"
            placeholder="Enter Zipcode"
            onChange={handleZipCodeChange}
          />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Address"
          name="address"
          rules={[requiredRules("Please Enter Address")]}
        >
          <Input.TextArea className="antd_input" placeholder="Enter Address" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please Select Country" }]}
        >
          <Input className="antd_input" placeholder="Select Country" />
        </Form.Item>
        <Form.Item
          className="form_item"
          label="State"
          name="state"
          rules={[{ required: true, message: "Please Select State" }]}
        >
          <Input className="antd_input" placeholder="Select State" />
        </Form.Item>
        <Form.Item
          className="form_item hidden"
          label="Latitude"
          name="latitude"
          rules={[{ required: true, message: "Please Enter latitude" }]}
        >
          <Input
            className="antd_input h-[40px]"
            placeholder="Enter latitude"
          />
        </Form.Item>
        <Form.Item
          className="form_item hidden"
          label="Longitude"
          name="longitude"
          rules={[{ required: true, message: "Please Enter longitude" }]}
        >
          <Input
            className="antd_input h-[40px]"
            placeholder="Enter longitude"
          />
        </Form.Item>
        <Form.Item className="form_item">
          <Button
            block
            htmlType="submit"
            onClick={() => {
              handleFinish(form.getFieldValue());
            }}
            className="primary_btn"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VendorRegistration;
