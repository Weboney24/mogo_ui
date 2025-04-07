/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Button, Dropdown, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { emailRules, requiredRules } from "../../helper/form_validation";
import { ImageHelper } from "../../helper/ImageHelper";
import { ErrorNotification } from "../../helper/notification_helper";
import { authUser, collectMyWishList, createUser, getMyCartsProduct, loginStaus } from "../../helper/api_helper";
import _ from "lodash";

import AvatarBox from "./AvatarBox";
import { useDispatch, useSelector } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

import { MakeLoginStatus } from "../../redux/logintriger";
import { loadusers } from "../../redux/userSlice";
import { ListCount } from "../../redux/favSlice";
import { cardCount } from "../../redux/cartSlice";

const AdverdiseNavbar = () => {
  const dispatch = useDispatch();

  const userData = useSelector((data) => data);

  const item = [
    { id: 1, name: "Location", icon: <GrLocation /> },
    { id: 2, name: "English", icon: <IoIosArrowDown /> },
    { id: 3, name: "INR", icon: <IoIosArrowDown /> },
  ];

  const fetchLoginData = async () => {
    try {
      if (localStorage.getItem("customers_token")) {
        const result = await Promise.all([
          loginStaus(),
          getMyCartsProduct(),
          collectMyWishList(),
          //   collectNotificationCount(),
        ]);

        dispatch(
          loadusers({
            name: _.get(result, "[0]data.data.user_name", ""),
            email: _.get(result, "[0]data.data.user_email", ""),
            mobile: _.get(result, "[0]data.data.user_mobile", ""),
            profile_color: _.get(result, "[0]data.data.profile_color", ""),
            user_profile: _.get(result, "[0]data.data.user_profile", ""),
          })
        );
        dispatch(cardCount({ count: _.get(result, "[1]data.data", []).length }));
        dispatch(ListCount({ count: _.get(result, "[2]data.data", []).length }));
        // dispatch(
        //   notificationCount({ count: _.get(result, "[3]data.data", []) })
        // );
      } else {
        dispatch(
          loadusers({
            name: "",
            email: "",
            mobile: "",
            profile_color: "",
            user_profile: "",
          })
        );
      }
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchLoginData();
  }, [_.get(userData, "notification_slice.value.count", "")]);

  console.log(_.get(userData, "login_slice.value.count"));
  useEffect(() => {
    if (_.get(userData, "login_slice.value.count", "") === "Login") {
      setFormStatus("Login");
      dispatch(
        MakeLoginStatus({
          count: !_.get(userData, "login_slice.value.count", ""),
        })
      );
    }
  }, [_.get(userData, "login_slice.value.count", "")]);

  const [formStatus, setFormStatus] = useState();

  const [form] = Form.useForm();

  const handleCancel = () => {
    try {
      setFormStatus();
      form.resetFields();
    } catch (err) {}
  };

  const items = [
    {
      key: "0",
      label: (
        <Link to="/my_profile">
          View Profile ? <span className="text-secondary">Click here</span>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setFormStatus("Register");
          }}
        >
          New Customer ? <span className="text-secondary">Register here</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setFormStatus("Login");
          }}
        >
          have an Account already ? <span className="text-secondary">Login here</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/vendor_registration">
          <h1>
            Become Seller ? <span className="text-secondary">Register here</span>
          </h1>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={"/vendor_signin"}>
          <h1>
            have an Seller Account already ? <span className="text-secondary">Login here</span>
          </h1>
        </Link>
      ),
    },
  ].filter((res) => {
    return _.get(userData, "product.value.email", "") ? ["0", "3", "4"].includes(res.key) : ["1", "2", "3", "4"].includes(res.key);
  });

  const handleFinish = async (values) => {
    try {
      if (formStatus === "Login") {
        const result = await authUser(values);
        console.log(result);
        localStorage.setItem("customers_token", _.get(result, "data.data.token", ""));
        notification.success({ message: "Login successfully Completed" });
      } else {
        const result = await createUser(values);
        localStorage.setItem("customers_token", _.get(result, "data.token", ""));
        notification.success({ message: "User created successfully" });
      }
      handleCancel();
      fetchLoginData();
    } catch (err) {
      if (_.get(err, "response.data.message", "") === "11000") {
        return notification.error({
          message: `This ${values.user_email}  Email is already in use`,
        });
      }
      console.log(err);
      ErrorNotification(err);
    }
  };

  return (
    <div className="w-screen bg-secondary text-sm min-h-[35px] !font-thin !font-serif py-2 center_div justify-between px-4 md:px-8 lg:px-16 ">
      <div className="center_div gap-x-4 text-white">
        <Link to={"/contact"}>
          Contact
        </Link>
        <h1>Sell on Mogo</h1>
      </div>
      <div className="text-white flex gap-x-8 items-center">
        {item.map((res, index) => {
          return (
            <div key={index}>
              {index === 0 ? (
                <div className="flex items-center !text-sm  gap-x-2">
                  {res.icon}
                  {res.name}
                </div>
              ) : (
                <div className="flex items-center !text-sm  gap-x-2">
                  {res.name}
                  {res.icon}
                </div>
              )}{" "}
            </div>
          );
        })}

        <div className="text-white ">
          <Dropdown
            menu={{
              items,
            }}
            arrow
          >
            <div className="flex gap-x-2 items-center cursor-pointer">{localStorage.getItem("customers_token") ? <AvatarBox /> : <div className="text-white font-Poppins">Login</div>}</div>
          </Dropdown>
        </div>
      </div>
      <Modal open={formStatus} footer={false} closable={false} destroyOnClose width={400} onCancel={handleCancel} form={form}>
        <div className="w-full flex flex-col items-center pb-5">
         <Link to="/"><img src={ImageHelper.Logo} alt="" className="w-[150px]" /></Link>

          <Form layout="vertical" className="!pt-6 flex flex-col gap-y-4" onFinish={handleFinish}>
            {formStatus === "Register" && (
              <Form.Item
                // className="form_item"
                label="Name"
                name="user_name"
                rules={[requiredRules("Please Enter Name")]}
              >
                <Input className="antd_input2 " placeholder="Email" />
              </Form.Item>
            )}
            <Form.Item
              // className="form_item"
              label="Email"
              name="user_email"
              rules={emailRules}
            >
              <Input className="antd_input2 " placeholder="Email" />
            </Form.Item>
            {formStatus === "Register" && (
              <Form.Item
                // className="form_item"
                label="Phone Number"
                name="user_mobile"
                rules={[{ required: true, message: "Phone Number" }]}
              >
                <Input type="number" className="antd_input2" placeholder="Enter Phone Number" />
              </Form.Item>
            )}
            <Form.Item
              // className="form_item"
              label="Password"
              name="user_password"
              rules={[requiredRules("Please Enter Email Address")]}
            >
              <Input className="antd_input2 " placeholder="Password" />
            </Form.Item>
            {formStatus === "Register" ? (
              <p
                onClick={() => {
                  setFormStatus("Login");
                }}
                className="text-end"
              >
                Already have account ?<span className="text-primary cursor-pointer">&nbsp;click here</span>
              </p>
            ) : (
              <p
                onClick={() => {
                  setFormStatus("Register");
                }}
                className="text-end"
              >
                Don't have account ?<span className="text-primary cursor-pointer">&nbsp;click here</span>
              </p>
            )}

            <Form.Item className="form_item">
              <Button
                block
                htmlType="submit"
                className="!h-[50px] !w-[300px] mt-3 bg-secondary !border-none !outline-none text-white hover:!text-white hover:!bg-primary"
                placeholder="Select Zipcode"
                // loading={loading}
              >
                {formStatus}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AdverdiseNavbar;
