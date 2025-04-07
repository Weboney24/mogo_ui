import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  List,
  message,
  Modal,
  Tag,
  Skeleton,
} from "antd";
import {
  getAllProducts,
  getMyProducts,
  updateProductRequestStatus,
} from "../../../helper/api_helper";
import _ from "lodash";
import { requiredRules } from "../../../helper/form_validation";
import {
  errorMessage,
  ErrorNotification,
  successMessage,
} from "../../../helper/notification_helper";

const OfferProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current_id, setCurrent_id] = useState("");

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllProducts();
      setAllProducts(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleOpen = (value) => {
  //   setCurrent_id(value._id);
  //   setOpen(true);
  //   form.setFieldsValue(value);
  // };

  const handleOpen = async (value) => {
    try {
      setLoading(true);

      const formData = {
        special_offer_status: true,
        product_id: value._id,
      };
      await updateProductRequestStatus(formData);
      successMessage("Product Added to Special Offer");
      fetchData();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialSellingPriceChange = (value) => {
    try {
      if (value === "mrp") {
        return form.setFieldsValue({
          special_selling_price: "",
        });
      }

      let vendorFinalPrice = form.getFieldValue("product_selling_price");
      const mrp = form.getFieldValue("special_mrp_price");
      let selling = form.getFieldValue("special_selling_price");

      if (Number(mrp) < Number(selling)) {
        form.setFieldsValue({
          special_selling_price: "",
        });
        return message.error(
          `The Special Selling Price needs to be Lower than the Special MRP  Price by a margin of ${mrp} or less not ${selling}`
        );
      }

      form.setFieldsValue({
        special_product_discount: "",
      });
      let discount_price = mrp - selling;

      let final_discount = (discount_price / mrp) * 100;

      form.setFieldsValue({
        special_product_discount: final_discount.toFixed(1),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinish = async (values) => {
    try {
      if (
        Number(values.product_selling_price) >
        Number(values.special_selling_price)
      ) {
        return message.error(
          `The Special Selling Price needs to be Higher than the Vendor Final Selling  Price by a margin of ${values.product_selling_price} or more not ${values.special_mrp_price}`
        );
      }
      setLoading(true);
      values.special_offer_status = true;
      values.product_id = current_id;
      await updateProductRequestStatus(values);
      successMessage("Products Added to Special Offer");
      fetchData();
      handleCancel();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setCurrent_id("");
  };

  const handleRemoveOffer = async (value) => {
    try {
      setLoading(true);
      let formdata = {
        special_offer_status: false,
        product_id: value._id,
        special_selling_price: null,
        special_product_discount: null,
        special_mrp_price: null,
      };
      await updateProductRequestStatus(formdata);
      successMessage("Products Removed to Special Offer");
      fetchData();
    } catch (err) {
      errorMessage("Failed to Removed Product from Special Offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Special Offers"
        Icon={IconHelper.OffersIcon}
        buttonShow={false}
      />
      <Skeleton loading={loading} active className="w-full pt-10">
        <div className="flex h-full justify-between gap-x-2 w-full pt-2">
          <div className="w-[60%] h-full  bg-white p-2 rounded-lg shadow-lg">
            <h1 className="px-2 py-2 center_div justify-start gap-x-2">
              <IconHelper.productIcon /> All Products
            </h1>
            <div className="w-full flex flex-wrap justify-between ">
              {allProducts.map((item, index) => {
                return (
                  <div
                    className="w-[30%] min-h-[200px]  my-2  shadow-lg pb-4 flex flex-col gap-y-2 bg-white mx-2 rounded-lg"
                    key={index}
                  >
                    <Image
                      src={_.get(item, "product_images[0][0]", "")}
                      className="!w-[100%] !h-[100px] object-cover rounded-t-lg"
                    />
                    <p className="px-2 line-clamp-1 text-sm !font-Poppins">
                      {item.product_name}
                    </p>
                    <div className="flex items-center px-2 gap-x-2">
                      <del className="text-red-500">
                        &#8377;{item.mogo_mrp_price}
                      </del>
                      <p className="text-secondary !font-Poppins">
                        &#8377;{item.mogo_selling_price}
                      </p>

                      <Tag className="offer_style !font-Poppins">
                        {item.mogo_discount_price}
                        <IconHelper.OffersIcon />
                      </Tag>
                    </div>
                    <Tag
                      color={item.product_in_stock ? "green" : "red"}
                      className={`!font-Poppins w-fit mx-2 px-2 text-[10px]`}
                    >
                      {item.product_in_stock
                        ? `In-stock (${item.product_quantity})`
                        : "Out-of-stock"}
                    </Tag>
                    <div
                      className={`offer_style_button ${
                        item.special_offer_status
                          ? "bg-primary !text-white cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        item.special_offer_status ? " " : handleOpen(item);
                      }}
                    >
                      {item.special_offer_status
                        ? "Already Added"
                        : "Add To  Special Offers"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider type="vertical" className="h-full" />
          <div className="!w-[40%] h-full bg-white p-2 rounded-lg shadow-lg">
            <h1 className="px-2 py-1 center_div justify-start gap-x-2">
              <IconHelper.OffersIcon /> Special Offer Products
            </h1>
            <div className="w-full flex items-center justify-start flex-wrap gap-2">
              {allProducts
                ?.filter((res) => {
                  return res.special_offer_status === true;
                })
                .map((item, index) => {
                  return (
                    <div
                      className="w-[45%] min-h-[200px]  shadow-lg pb-4 flex flex-col gap-y-2 bg-white mx-2 rounded-lg"
                      key={index}
                    >
                      <Image
                        src={_.get(item, "product_images[0][0]", "")}
                        className="!w-[100%] !h-[100px] object-cover rounded-t-lg"
                      />
                      <p className="px-2 line-clamp-1 !font-Poppins">
                        {item.product_name}
                      </p>
                      <div className="flex items-center px-2 gap-x-2">
                        <del className="text-red-500">
                          &#8377;{item.mogo_mrp_price}
                        </del>
                        <p className="text-secondary !font-Poppins">
                          &#8377;{item.mogo_selling_price}
                        </p>
                        <Tag className="offer_style !font-Poppins">
                          {item.special_product_discount}
                          <IconHelper.OffersIcon />{" "}
                        </Tag>
                      </div>
                      <Tag
                        color={item.product_in_stock ? "green" : "red"}
                        className={`!font-Poppins w-fit mx-1 px-2 text-[10px]`}
                      >
                        {item.product_in_stock
                          ? `In-stock (${item.product_quantity})`
                          : "Out-of-stock"}
                      </Tag>
                      <div
                        onClick={() => {
                          handleRemoveOffer(item);
                        }}
                        className={`offer_style_button hover:bg-red-500`}
                      >
                        Remove
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Skeleton>
      <Modal
        open={open}
        footer={false}
        title="Add to Special Offers"
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          className="flex flex-col gap-y-2"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Vendor Final Selling Price"
            name="product_selling_price"
          >
            <Input
              disabled
              prefix="₹"
              className="!border-transparent antd_input2 !w-full"
            />
          </Form.Item>
          <Form.Item label="Mogo Final Selling Price" name="mogo_selling_price">
            <Input
              disabled
              prefix="₹"
              className="!border-transparent antd_input2 !w-full"
            />
          </Form.Item>
          <Form.Item
            label="Special  MRP Price"
            name="special_mrp_price"
            rules={[requiredRules("Enter Mogo MRP Price")]}
          >
            <Input
              type="number"
              onChange={() => {
                handleSpecialSellingPriceChange("mrp");
              }}
              placeholder="Enter Mogo MRP Price"
              prefix="₹"
              className="antd_input2 !w-full"
            />
          </Form.Item>
          <Form.Item
            label="Special Final Selling Price"
            name="special_selling_price"
            rules={[requiredRules("Enter Special Selling Price")]}
          >
            <Input
              onChange={handleSpecialSellingPriceChange}
              placeholder="Enter Special Selling Price"
              prefix="₹"
              className="antd_input2 !w-full"
            />
          </Form.Item>
          <Form.Item label="Special Discount %" name="special_product_discount">
            <Input
              type="number"
              disabled
              max={90}
              min={0}
              placeholder="Enter Special Discount %"
              suffix="%"
              className="antd_input2 !w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="!primary_btn !bg-secondary !h-[35px] mt-2"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OfferProducts;
