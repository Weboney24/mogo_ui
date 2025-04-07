/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import AdverdiseNavbar from "./AdverdiseNavbar";
import { ImageHelper } from "../../helper/ImageHelper";
import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Tag,
} from "antd";
import {
  CaretRightOutlined,
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IconHelper } from "../../helper/IconHelper";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getCategoryInfo } from "../customapi";
import { useNavigate } from "react-router-dom";
import {
  authUser,
  collectMyWishList,
  createUser,
  getMyCartsProduct,
  globalSearchProduct,
  loginStaus,
} from "../../helper/api_helper";
import { loadusers } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorNotification } from "../../helper/notification_helper";

import { ListCount } from "../../redux/favSlice";
import { cardCount } from "../../redux/cartSlice";
import AvatarBox from "./AvatarBox";
import { MakeLoginStatus } from "../../redux/logintriger";
import { emailRules, requiredRules } from "../../helper/form_validation";

const TopNavbar = () => {
  const [form] = Form.useForm();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [searchValues, setSearchValues] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await getCategoryInfo();
      let search = {
        name: searchValues || "all",
      };
      const product = await globalSearchProduct(JSON.stringify(search));

      setCategoryData(_.get(result, "[0]data.data", []));
      setSubCategoryData(_.get(result, "[1]data.data", []));
      setProducts(_.get(product, "data.data", []));
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  const userData = useSelector((data) => data);

  useEffect(() => {
    fetchData();
  }, [searchValues]);

  useEffect(() => {
    fetchLoginData();
  }, [_.get(userData, "notification_slice.value.count", "")]);

  const handleCategoryClick = (name) => {
    if (name === "Home textiles") {
      navigate("/explore");
    } else {
      navigate("/comming_soon");
    }
  };

  const handleSubcategoryClick = (res) => {
    navigate("/explore", { state: { subcat: res } });
  };

  const handleSearchClick = (res) => {
    setSearchValues();
    window.open(`/produt_details/${res}`, "_blank");
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const quickLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 1, name: "About Us", link: "/about" },
    { id: 1, name: "Contact Us", link: "/contact" },
    { id: 1, name: "Help Center", link: "/contact" },
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
        dispatch(
          cardCount({ count: _.get(result, "[1]data.data", []).length })
        );
        dispatch(
          ListCount({ count: _.get(result, "[2]data.data", []).length })
        );
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

  const handleCancel = () => {
    try {
      setFormStatus();
      form.resetFields();
    } catch (err) {}
  };

  const handleFinish = async (values) => {
    try {
      if (formStatus === "Login") {
        const result = await authUser(values);
        console.log(result);
        localStorage.setItem(
          "customers_token",
          _.get(result, "data.data.token", "")
        );
        notification.success({ message: "Login successfully Completed" });
      } else {
        const result = await createUser(values);
        localStorage.setItem(
          "customers_token",
          _.get(result, "data.token", "")
        );
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
          have an Account already ?{" "}
          <span className="text-secondary">Login here</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/vendor_registration">
          <h1>
            Become Seller ?{" "}
            <span className="text-secondary">Register here</span>
          </h1>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to={"/vendor_signin"}>
          <h1>
            have an Seller Account already ?{" "}
            <span className="text-secondary">Login here</span>
          </h1>
        </Link>
      ),
    },
  ].filter((res) => {
    return _.get(userData, "product.value.email", "")
      ? ["0", "3", "4"].includes(res.key)
      : ["1", "2", "3", "4"].includes(res.key);
  });

  return (
    <div className="bg-white w-full !z-50 shadow">
      <div className="hidden sm:block">
        <AdverdiseNavbar />
      </div>

      <div className="w-full flex items-center justify-between lg:hidden px-4 md:px-8 lg:px-16 py-3">
        <Link to="/">
          <img src={ImageHelper.Logo} alt="logo" className="w-[120px]" />
        </Link>
        <MenuOutlined
          className="text-xl text-secondary"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      <div className="hidden lg:flex w-full bg-white text-sm flex-col items-center justify-center px-4 md:px-8 lg:px-16 min-h-[120px]">
        <div className="flex items-center justify-between w-full py-4">
          {/* Logo */}
          <Link to="/" className="w-[30%]">
            <img src={ImageHelper.Logo} alt="" className="w-[150px]" />
          </Link>

          <div className="w-[60%]  flex justify-center items-center relative search_box">
            <Select
              className="!w-[30%] !h-[50px] !rounded-none  "
              placeholder="All Categories"
            >
              <Select.Option key={"all"}>{"All"}</Select.Option>
              {categoryData.map((res, index) => {
                return (
                  <Select.Option key={index}>{res.category_name}</Select.Option>
                );
              })}
            </Select>

            <div className="w-[70%]">
              <Input
                showSearch
                suffix={
                  !searchValues ? (
                    <SearchOutlined />
                  ) : (
                    <CloseOutlined
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setSearchValues("")}
                    />
                  )
                }
                value={searchValues}
                onChange={(e) => setSearchValues(e.target.value)}
                className="w-full h-[50px] !border !border-l-transparent !rounded-none indent-3"
                placeholder="Search Product"
              />
              {/* Search dropdown result */}
              {searchValues &&
                (!_.isEmpty(products) ? (
                  <div className="absolute top-[50px] w-[70%] bg-white z-50 overflow-scroll max-h-[400px] rounded-b-lg">
                    {products.map((res, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-x-2 hover:bg-slate-50 px-2 py-2 cursor-pointer"
                        onClick={() => handleSearchClick(res._id)}
                      >
                        <img
                          src={_.get(res, "product_images[0][0]", "")}
                          className="w-[50px] h-[50px] rounded-sm"
                        />
                        <div className="text-[14px] capitalize text-slate-600">
                          {res.product_name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute top-[50px] w-[70%] bg-white z-50 overflow-scroll max-h-[400px] rounded-b-lg flex items-center justify-center min-h-[200px]">
                    <Empty className="!w-[100px]" />
                  </div>
                ))}
            </div>
          </div>

          {/* Cart & Wishlist */}
          <div className="w-[30%] flex justify-end items-center gap-x-10">
            <Badge
              count={_.get(userData, "card_slice.value.count", "10")}
              color="green"
              offset={[1, -3]}
            >
              <Link
                to="/my_cart"
                className="flex items-center gap-x-1 group cursor-pointer"
              >
                <IconHelper.cardIcons className="text-2xl !text-secondary" />
                <span className="!text-lg font-medium group-hover:!text-secondary">
                  Cart
                </span>
              </Link>
            </Badge>
            <Badge
              count={_.get(userData, "list_slice.value.count", "")}
              color="green"
              offset={[1, -3]}
            >
              <Link
                to="/my_wishlist"
                className="flex items-center gap-x-1 group cursor-pointer"
              >
                <IconHelper.HeartIcon className="text-2xl !text-secondary" />
                <span className="!text-lg font-medium group-hover:!text-secondary">
                  Wishlist
                </span>
              </Link>
            </Badge>
          </div>
        </div>

        <div className="self-start py-4 flex items-center justify-start w-full overflow-hidden gap-x-6">
          <Link
            to="/explore"
            className="cursor-pointer flex items-center gap-x-2 text-[14px] !font-Poppins text-secondary"
          >
            All
          </Link>
          {categoryData.map((res, index) => (
            <Tag
              key={index}
              onClick={() => handleCategoryClick(res.category_name)}
              className="cursor-pointer hover:scale-105 hover:text-secondary bg-white border-transparent text-[14px] uppercase"
            >
              {res.category_name}
            </Tag>
          ))}
          {subCategoryData.map((res, index) => (
            <Tag
              key={index}
              onClick={() => handleSubcategoryClick(res)}
              className="cursor-pointer hover:scale-105 hover:text-secondary bg-white border-transparent text-[14px] uppercase"
            >
              {res.sub_category_name}
            </Tag>
          ))}
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className="grid grid-cols-2 items-start gap-5">
          <div className="pb-5">
            <h1 className="font-semibold mb-2">Quick Links</h1>
            <div className="flex flex-col gap-y-2 pt-2">
              {quickLinks.map((res, index) => (
                <Link
                  to={res.link}
                  className=" text-black cursor-pointer flex items-center gap-x-2"
                  key={index}
                >
                  <CaretRightOutlined className="!text-[10px] text-black" />{" "}
                  {res.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Profile</h1>
            <div className="text-white ">
              <Dropdown
                menu={{
                  items,
                }}
                arrow
              >
                <div className="flex gap-x-2 items-center cursor-pointer">
                  {localStorage.getItem("customers_token") ? (
                    <div className="flex flex-row items-center gap-2">
                      <AvatarBox />{" "}
                      <p className="text-black">
                        {_.get(userData, "product.value.name", "")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-white font-Poppins">Login</div>
                  )}
                </div>
              </Dropdown>
            </div>
            <div className="flex flex-col gap-y-4 mt-3">
              <Link to="/my_cart" className="flex items-center gap-x-2">
                <IconHelper.cardIcons className="text-xl text-secondary" />
                <span>Cart</span>
              </Link>
              <Link to="/my_wishlist" className="flex items-center gap-x-2">
                <IconHelper.HeartIcon className="text-xl text-secondary" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-start gap-5">
          <div>
            <p className="font-semibold mb-2">Categories</p>
            <Link
              to="/explore"
              className="cursor-pointer flex items-center gap-x-2 text-[14px] !font-Poppins text-secondary"
            >
              All
            </Link>
            {categoryData.map((res, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(res.category_name)}
                className="cursor-pointer text-secondary py-1"
              >
                {res.category_name}
              </div>
            ))}
          </div>
          <div>
            <p className="font-semibold mb-2">Sub Categories</p>
            {subCategoryData.map((res, index) => (
              <div
                key={index}
                onClick={() => handleSubcategoryClick(res)}
                className="cursor-pointer text-gray-500 text-sm py-1"
              >
                {res.sub_category_name}
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      <Modal
        open={formStatus}
        footer={false}
        closable={false}
        destroyOnClose
        width={400}
        onCancel={handleCancel}
        form={form}
      >
        <div className="w-full flex flex-col items-center pb-5">
          <Link to="/">
            <img src={ImageHelper.Logo} alt="" className="w-[150px]" />
          </Link>

          <Form
            layout="vertical"
            className="!pt-6 flex flex-col gap-y-4"
            onFinish={handleFinish}
          >
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
                <Input
                  type="number"
                  className="antd_input2"
                  placeholder="Enter Phone Number"
                />
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
                Already have account ?
                <span className="text-primary cursor-pointer">
                  &nbsp;click here
                </span>
              </p>
            ) : (
              <p
                onClick={() => {
                  setFormStatus("Register");
                }}
                className="text-end"
              >
                Don't have account ?
                <span className="text-primary cursor-pointer">
                  &nbsp;click here
                </span>
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

export default TopNavbar;
