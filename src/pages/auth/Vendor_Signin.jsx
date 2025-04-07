import React, { useEffect } from "react";
import { ImageHelper } from "../../helper/ImageHelper";
import { Form, Input, Button, message, Divider } from "antd";
import { emailRules, requiredRules } from "../../helper/form_validation";
import { authVendor } from "../../helper/api_helper";
import { ErrorNotification, successMessage } from "../../helper/notification_helper";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";

const Vendor_Signin = () => {
  // redirect

  useEffect(() => {
    if (localStorage.getItem("vendor_token")) {
      navigate("/dashboard/products");
    }
  }, []);

  const navigate = useNavigate();

  const handleFinish = async (value) => {
    try {
      const result = await authVendor(value);
      localStorage.setItem("vendor_token", _.get(result, "data.token", ""));
      successMessage("Start your journey");
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      ErrorNotification(err);
    }
  };

  return (
    <div className="w-screen bg-light_gray center_div min-h-screen">
      <div className="bg-white w-[90%] sm:w-[400px] pb-10 pt-3 min-h-[400px] rounded-2xl shadow-2xl flex items-center justify-start flex-col">
        <div className="w-full center_div pt-5">
          <img src={ImageHelper.Logo} alt="" className="w-[50%] sm:w-[40%]" />
        </div>
        {/* <h1 className="heading_text_2xl pt-4">Vendor Login</h1> */}
        <Form layout="vertical" className="pt-5 !flex !flex-col !gap-y-4" onFinish={handleFinish}>
          <Form.Item label="Email" className="w-full sm:w-[300px]" name="email" rules={emailRules}>
            <Input placeholder="Enter Email" className="antd_input" />
          </Form.Item>
          <Form.Item label="Password" className="w-full sm:w-[300px]" name="password" rules={[requiredRules("Please enter your password")]}>
            <Input.Password placeholder="Enter Password" className="antd_input" />
          </Form.Item>
          <div className="center_div justify-between w-full sm:w-[300px]">
            <p className="pb-3 text-end cursor-pointer">Forget password?</p>
            <Link to="/vendor_registration" className="pb-3 text-end cursor-pointer">
              Create Vendor Account?
            </Link>
          </div>
          <Form.Item className="w-full sm:w-[300px] pt-2">
            <Button htmlType="submit" className="primary_btn w-full sm:w-auto">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Vendor_Signin;
