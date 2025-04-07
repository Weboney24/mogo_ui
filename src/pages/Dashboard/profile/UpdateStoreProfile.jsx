import { Button, Form, Input, notification, Spin } from "antd";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { emailRules, requiredRules } from "../../../helper/form_validation";
import { useEffect, useState } from "react";
import {
  getCurrentUserData,
  getZipCodeAddress,
  updateVendor,
} from "../../../helper/api_helper";
import _ from "lodash";

const UpdateStoreProfile = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [dummy, setDummy] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getCurrentUserData();
      form.setFieldsValue(_.get(result, "data.data[0]", []));
    } catch (err) {
      console.log(err);
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
      await updateVendor(values);
      fetchData();
      notification.success({ message: "Vendor Profile updated" });
    } catch (err) {
      if (_.get(err, "response.data.message", "") === "11000") {
        return notification.error({
          message:
            "The email provided has already been utilized by someone else.",
        });
      }
      notification.error({ message: "Vendor registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleZipCodeChange = async (e) => {
    try {
      setLoading(true);
      let value = e.target.value;

      if (value.length === 6) {
        const result = await getZipCodeAddress({ code: e.target.value });
        console.log(result);
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
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Update Profile"
        Icon={IconHelper.profileIcon}
        vendorShown={false}
        adminShown={false}
      />
      <Spin spinning={loading}>
        <Form
          onFinish={handleFinish}
          layout="vertical"
          autoComplete="off"
          form={form}
          className="flex items-center pt-10 flex-wrap gap-x-10 bg-white p-10 gap-y-6"
        >
          <Form.Item
            className="form_item"
            label="First Name"
            name="first_name"
            rules={[requiredRules("Please Enter First Name")]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter First Name"
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Last Name"
            name="last_name"
            rules={[requiredRules("Please Enter Last Name")]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter Last Name"
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Company Name"
            name="company_name"
            rules={[requiredRules("Please Enter Company Name")]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter Company Name"
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Email"
            name="email"
            rules={emailRules}
          >
            <Input className="antd_input h-[40px]" placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Phone Number"
            name="phone_number"
            rules={[{ required: true, message: "Please Enter  Phone Number" }]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter Phone Number"
            />
          </Form.Item>

          <Form.Item
            className="form_item"
            label="GSTN"
            name="GSTN"
            rules={[requiredRules("Please Enter GSTN")]}
          >
            <Input className="antd_input " placeholder="Enter GSTN" />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Zipcode"
            name="zipcode"
            rules={[
              { required: true, message: "Please Enter Zipcode" },
              {
                max: 6,
                min: 6,
                message: "Please enter a valid zipcode",
              },
            ]}
          >
            <Input
              maxLength={6}
              minLength={6}
              type="number"
              className="antd_input h-[40px]"
              placeholder="Enter Zipcode"
              onChange={(e) => {
                handleZipCodeChange(e);
              }}
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Address"
            name="address"
            rules={[requiredRules("Please Enter Address")]}
          >
            <Input.TextArea
              className="antd_input !h-[40px]"
              placeholder="Enter Address"
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please Select Country" }]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Select Country"
            />
          </Form.Item>
          <Form.Item
            className="form_item"
            label="State"
            name="state"
            rules={[{ required: true, message: "Please Select State" }]}
          >
            <Input className="antd_input h-[40px]" placeholder="Select State" />
          </Form.Item>

          <Form.Item
            className="form_item hidden"
            label="Latitude"
            name="latitude"
            rules={[{ required: true, message: "Please Enter latitude " }]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter latitude "
            />
          </Form.Item>
          <Form.Item
            className="form_item hidden"
            label="Longitude"
            name="longitude"
            rules={[{ required: true, message: "Please Enter  longitude" }]}
          >
            <Input
              className="antd_input h-[40px]"
              placeholder="Enter  longitude"
            />
          </Form.Item>
          <Form.Item className="form_item ">
            <Button
              htmlType="submit"
              className="primary_btn !h-[40px]"
              placeholder="Select Zipcode"
              loading={loading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default UpdateStoreProfile;
