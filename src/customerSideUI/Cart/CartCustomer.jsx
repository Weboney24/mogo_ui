/* eslint-disable no-empty */
import React, { useEffect, useState } from "react";
import {
  getDeliveryCharges,
  getDeliveryforCustomerCharges,
  getMyCarts,
  getMyCartsProduct,
  updateMyCart,
} from "../../helper/api_helper";
import {
  getDeliveryChargeTotal,
  getDeliveryChargesPrice,
  getFinalPrice,
  getProductDetails,
} from "../../helper/filter_helper";
import _ from "lodash";
import {
  Avatar,
  Badge,
  Card,
  Divider,
  Empty,
  Image,
  Popconfirm,
  Skeleton,
  Spin,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { v4 as uuid4 } from "uuid";
import { IconHelper } from "../../helper/IconHelper";
import { Link, useNavigate } from "react-router-dom";
import { cardCount } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const CartCustomer = () => {
  const [loading, setLoading] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [checkoutDetails, setCheckoutDetails] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyCarts();

      const result2 = await getDeliveryforCustomerCharges();
      const result3 = await getMyCartsProduct();

      setCartData(_.get(result, "data.data", []));
      dispatch(cardCount({ count: _.get(result3, "data.data", []).length }));

      setCheckoutDetails(
        _.get(result, "data.data.carts", []).map((res) => {
          let relese = getProductDetails(
            _.get(res, "varient_unique_id", ""),
            _.get(result, "data.data.product", [])
          );

          return {
            variant_id: _.get(res, "varient_unique_id", ""),
            product_name: _.get(relese, "[0].product_name", ""),
            product_selling_price: _.get(res, "mogo_selling_price", ""),
            product_mrp_price: _.get(res, "mogo_mrp_price", ""),

            vendor_product_selling_price: _.get(
              res,
              "vendor_selling_price",
              ""
            ),
            vendor_product_mrp_price: _.get(res, "vendor_mrp_price", ""),

            product_image: _.get(relese, "[0].product_images[0][0]", ""),
            subcategory_id: _.get(relese, "[0].product_sub_category_name", ""),
            product_quantity: 1,
            product_finalTotal: _.get(res, "mogo_selling_price", ""),
            vendor_product_finalTotal: _.get(res, "vendor_selling_price", ""),

            vendor_id: _.get(relese, "[0].user_id._id", ""),
            vendor_store: _.get(relese, "[0].user_id.company_name", ""),
            order_status: "confirmed",
            invoice_no: `MOGO${uuid4().slice(0, 6)}`,
            variant_color: _.get(res, "product_variant_color", ""),
            product_id: _.get(relese, "[0]._id", ""),
            deliveryCharge: getDeliveryChargesPrice(
              _.get(result2, "data.data", []),
              _.get(res, "product_weight", "")
            ),
          };
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (id) => {
    try {
      setLoading(true);
      await updateMyCart({ id: id });
      fetchData();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = (value, flag, final_count, id) => {
    try {
      let operation = flag === "increase" ? 1 : -1;

      if (final_count + operation === 0) {
        handleRemove(id);
      }

      setCheckoutDetails((pre) => {
        return pre.map((res) => {
          if (res.variant_id === value.variant_id) {
            return {
              ...res,
              ["product_finalTotal"]:
                Number(res.product_selling_price) *
                Number(res.product_quantity + operation),
              ["product_quantity"]: res.product_quantity + operation,
              ["vendor_product_finalTotal"]:
                Number(res.vendor_product_selling_price) *
                Number(res.product_quantity + operation),
            };
          }
          return res;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handeletrigerCheckout = () => {
    try {
      navigate("/checkout", {
        state: {
          cardData: checkoutDetails,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen min-h-screen px-4 md:px-8 lg:px-16 py-10 !select-none">
      <Spin spinning={loading}>
        <div className="flex items-center justify-between pt-10">
          <h1 className="font-Poppins flex items-center gap-x-2">
            <IconHelper.cardIcons /> My Cart
          </h1>
        </div>
        {_.isEmpty(checkoutDetails) ? (
          <div className="pt-[15vh]">
            <Empty />
          </div>
        ) : (
          <>
            <div className="flex flex-col-reverse lg:flex-row w-[100%] gap-5 lg:gap-x-10 lg:gap-y-6 pt-10 justify-start ">
              <div className="w-full lg:w-[70%] flex flex-wrap gap-5 lg:gap-10">
                {checkoutDetails.map((res, index) => {
                  return (
                    <div
                      style={{
                        borderColor: res.variant_color,
                      }}
                      className={`border-l-2 bg-white w-full lg:w-[47%] px-2 h-[120px]  gap-x-2 flex flex-col shadow rounded-lg relative`}
                      key={index}
                    >
                      <div className="flex gap-x-3 pt-2">
                        {/* <Link to={`/produt_details/${res.product_id}`}> */}
                        <img src={res.product_image} className="!h-[50px] !rounded-lg shadow-inner p-[1px]" />
                        {/* </Link> */}
                        <div className="-pt-10 flex flex-col gap-y-1 text-sm">
                          <h1 className="font-Poppins">{res.product_name}</h1>

                          <h1 className="flex items-center gap-x-1 text-sm font-Poppins">
                            <h1 className="font-Poppins text-primary">
                              ₹&nbsp;
                              {res.product_selling_price}
                            </h1>
                            <IconHelper.crossIcon />
                            {res.product_quantity} &nbsp;&nbsp;&nbsp;= <h1 className="text-secondary font-bold">₹ {Number(res.product_finalTotal)?.toLocaleString()}</h1>
                          </h1>
                          {/* quantity */}
                          <div className="flex items-center  pt-4 ">
                            <Popconfirm
                              title="Do You Really Want to Remove"
                              okText="Yes"
                              cancelText="No"
                              disabled={Number(_.get(res, "product_quantity", "")) > 1}
                              onConfirm={() => {
                                handleIncreaseQuantity(res, "decrease", _.get(res, "product_quantity", ""), _.get(res, "variant_id", ""));
                              }}
                            >
                              <Tooltip placement="bottom" title={Number(_.get(res, "product_quantity", "")) > 1 ? "Decrease Quantity" : "Remove Product"}>
                                <div className=" border center_div w-[50px] h-[35px] shadow-2xl border-gray-100 hover:scale-110 px-1 font-Poppins cursor-pointer">
                                  {Number(_.get(res, "product_quantity", "")) > 1 ? (
                                    <div
                                      onClick={() => {
                                        handleIncreaseQuantity(res, "decrease", _.get(res, "product_quantity", ""), _.get(res, "variant_id", ""));
                                      }}
                                    >
                                      -
                                    </div>
                                  ) : (
                                    <DeleteOutlined className="!text-[12px]" />
                                  )}
                                </div>
                              </Tooltip>
                            </Popconfirm>

                            <div className=" w-[50px] h-[35px] shadow-inner hover:scale-110 border-gray-100 border center_div px-1 font-Poppins cursor-pointer">{_.get(res, "product_quantity", "")}</div>
                            <div
                              className=" w-[50px] h-[35px] shadow-2xl hover:scale-110 border border-gray-100 center_div px-1 font-Poppins cursor-pointer"
                              onClick={() => {
                                handleIncreaseQuantity(res, "increase", _.get(res, "product_quantity", ""));
                              }}
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* CHECKOUT CONTINUE */}
              <div className="flex w-full lg:w-[27%] shadow-md border border-secondary rounded font-semibold min-h-[300px] flex-col px-4 py-4 gap-y-4 relative">
                <div className="flex items-center justify-between pt-2">
                  <h1>Price ({checkoutDetails?.length} item)</h1>
                  <h1>₹{Number(getFinalPrice(checkoutDetails)).toLocaleString()}</h1>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <h1>Shipping Charges</h1>
                  <h1> ₹{Number(getDeliveryChargeTotal(checkoutDetails)).toLocaleString()}</h1>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <h1>Total</h1>
                  <h1>₹{(Number(getDeliveryChargeTotal(checkoutDetails)) + Number(getFinalPrice(checkoutDetails))).toLocaleString()}</h1>
                </div>
                <div onClick={handeletrigerCheckout} className="w-[90%] bg-secondary center_div cursor-pointer text-white h-[50px] absolute bottom-10">
                  Continue to Checkout
                </div>
              </div>
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};

export default CartCustomer;
