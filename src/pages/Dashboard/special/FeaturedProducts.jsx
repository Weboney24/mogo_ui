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

const FeaturedProducts = () => {
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

  const handleOpen = async (value) => {
    try {
      setLoading(true);
      const formData = {
        trending_product_status: true,
        product_id: value._id,
      };

      await updateProductRequestStatus(formData);
      successMessage("Products Added to Trending Products");
      fetchData();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOffer = async (value) => {
    try {
      setLoading(true);
      let formdata = {
        trending_product_status: false,
        product_id: value._id,
      };
      await updateProductRequestStatus(formdata);
      successMessage("Products Removed to Trending Products");
      fetchData();
    } catch (err) {
      errorMessage("Failed to Removed Product from Trending Products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Trending Products"
        Icon={IconHelper.featuredIcons}
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
                        item.trending_product_status
                          ? "bg-primary !text-white cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        item.trending_product_status ? " " : handleOpen(item);
                      }}
                    >
                      {item.trending_product_status
                        ? "Already Added"
                        : "Add To Trending Products"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider type="vertical" className="h-full" />
          <div className="!w-[40%] h-full bg-white p-2 rounded-lg shadow-lg">
            <h1 className="px-2 py-1 center_div justify-start gap-x-2">
              <IconHelper.featuredIcons /> Trending Products
            </h1>
            <div className="w-full flex items-center justify-start flex-wrap gap-2">
              {allProducts
                ?.filter((res) => {
                  return res.trending_product_status === true;
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
                          {item.mogo_product_discount}
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
    </div>
  );
};

export default FeaturedProducts;
