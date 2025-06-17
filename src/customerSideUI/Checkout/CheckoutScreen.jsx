import { Button, Divider, Form, Input, Spin, Tag } from "antd";
import { IconHelper } from "../../helper/IconHelper";
import { useEffect, useState } from "react";
import { ErrorNotification, errorMessage, successMessage } from "../../helper/notification_helper";
import { MakeOrder, getMyDeliveryAddress, veriFyCoupon } from "../../helper/api_helper";
import _ from "lodash";
import { ImHome3 } from "react-icons/im";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDeliveryChargeTotal, getFinalPrice, getFinalSoloPrice } from "../../helper/filter_helper";
import { requiredRules } from "../../helper/form_validation";
import DeliveryAddress from "./DeliveryAddress";
import { SiWebmoney } from "react-icons/si";
import { BsCashCoin } from "react-icons/bs";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CheckoutScreen = () => {
  const [myDeliveryAddress, setMyDeliveryAddress] = useState([]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);

  const userData = useSelector((data) => data);

  const [finalPrice, setFinalPrice] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");

  const [paymentMethod, setPaymentMethods] = useState("Cash On Delivery");

 
  const [paymentAmount, setPaymentAmount] = useState("");

  const [currentweightamout, setCurrentWeightAmount] = useState("");
  const location = useLocation();

  console.log(location);
  let rawPrice = _.get(location, "state.cardData[0].product_selling_price", "0");
  const quantityStr = _.get(location, "state.cardData[0].product_quantity", "");

  const selling_price = parseInt(String(rawPrice).replace(/,/g, ""), 10);
  const codquantity = parseInt(quantityStr, 10) || 1;
  console.log(quantityStr, "madhan");

  const totalAmount = selling_price * codquantity;

  function calculateCODCharge(totalAmount) {
    let baseCharge = 40;

    if (totalAmount <= 1500) {
      return baseCharge;
    }

    // Subtract base slab (1500), then calculate extra slabs of 500 each
    let extraAmount = totalAmount - 1500;
    let extraSlabs = Math.ceil(extraAmount / 500);
    let extraCharge = extraSlabs * 15;

    return baseCharge + extraCharge;
  }

  const codCharge = calculateCODCharge(totalAmount);
  console.log("Total Amount:", totalAmount);
  console.log("COD Charge:", codCharge);

  const quantity = parseInt(_.get(location, "state.cardData[0].product_quantity", "1"), 10);
  const weightPerItem = parseFloat(_.get(location, "state.cardData[0].product_weight", "0"));

  const totalamount = () => {
    try {
      const totalWeight = quantity * weightPerItem;

      let charge = 0;

      if (totalWeight >= 0.5) {
        const firstSlabLimit = 1.1;
        const slabSize = 1.0;
        const slabRate = 40;

        charge = slabRate;

        const weightAfterFirstSlab = totalWeight - firstSlabLimit;

        if (weightAfterFirstSlab > 0) {
          const additionalSlabs = Math.ceil(weightAfterFirstSlab / slabSize);
          charge += additionalSlabs * slabRate;
        }
      }

      setCurrentWeightAmount(charge);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    totalamount();
  }, []);

  const NoDeliveryAddress = () => {
    return (
      <div className={`w-full h-[70vh] flex flex-wrap gap-5 pt-5 ${!_.isEmpty(myDeliveryAddress) ? "items-center justify-between" : "items-center"} `}>
        {_.isEmpty(myDeliveryAddress) ? (
          <Link to="/my_profile?5">
            <div className="w-[400px] h-[60px] border hover:bg-secondary hover:text-white border-secondary text-secondary font-bold center_div cursor-pointer rounded-lg">+ &nbsp; Add Delivery Address</div>
          </Link>
        ) : (
          myDeliveryAddress.map((res, index) => {
            return (
              <Tag
                color={selectedDeliveryAddress === res?._id ? "green" : ""}
                key={index}
                onClick={() => {
                  setSelectedDeliveryAddress(res?._id);
                }}
                className={`w-[400px]  cursor-pointer hover:border-secondary border  min-h-[100px] shadow-md p-4 flex flex-col gap-y-1 rounded-lg`}
              >
                {res.address_name != "office" ? (
                  <div className="flex items-center gap-x-2 font-Poppins">
                    <ImHome3 /> <div>Home Address</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2 font-Poppins">
                    <HiMiniBuildingOffice2 /> <div>Office Address</div>
                  </div>
                )}
                <h1 className="font-Poppins">{res.full_name}</h1>
                <address>
                  <h1 className="tracking-wider">
                    {res.phone_number}, &nbsp;
                    {res.alternate_phone_number}
                  </h1>

                  {res.address}
                  <h1>
                    {res.district}, &nbsp;
                    {res.pincode}
                  </h1>
                </address>
              </Tag>
            );
          })
        )}
      </div>
    );
  };

  useEffect(() => {
    setFinalPrice(Number(getFinalPrice(_.get(location, "state.cardData", []))));
  }, [_.get(location, "state.cardData", [])]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [paymentUrl, setPaymentUrl] = useState("");

  const handleRemoveCoupon = () => {
    if (couponPrice) {
      setCouponPrice("");
      setCouponDiscount("");
    }
  };

  const handleFinish = async (values) => {
    try {
      const result = await veriFyCoupon(values.coupon_code);
      if (_.isEmpty(_.get(result, "data.data", []))) {
        return errorMessage("Invalid Coupon Code");
      }
      setCouponPrice(getFinalSoloPrice(_.get(location, "state.cardData", []), _.get(result, "data.data.coupon_discount", "")));
      setCouponDiscount(_.get(result, "data.data", ""));
      return successMessage("Coupon Applied");
    } catch (err) {
      console.log(err);
    }
  };

  const CouponDetails = () => {
    return (
      <div className="w-full flex flex-col-reverse lg:flex-row gap-2 pt-5">
        <div className="w-full lg:w-[50%] min-h-[400px]">
          {_.get(couponDiscount, "coupon_discount", "") ? (
            <Button onClick={handleRemoveCoupon} className="h-[40px] bg-primary text-white center_div text-sm rounded-lg">
              Remove Coupon
            </Button>
          ) : (
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Coupon Code" name="coupon_code" rules={[requiredRules("Enter Coupon Code")]}>
                <Input placeholder="Enter Coupon Code" className="ant_input2 w-full lg:w-[300px] h-[35px]" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="bg-secondary text-white mt-4">
                  Verify
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        {/* payment Details */}
        <div className="w-full lg:w-[50%] min-h-[400px] ">
          <h1 className="font-Poppins">Payment Details</h1>

          <div className="flex flex-col gap-y-3 pt-4 ">
            {_.get(location, "state.cardData", []).map((res, index) => {
              return (
                <div key={index} className="flex items-center justify-between pt-2 ">
                  <div>
                    <div className="flex items-center gap-x-2 text-sm">
                      <h1>{res.product_name}</h1>
                      <IconHelper.crossIcon style={{ color: res.variant_color }} />
                      <h1>{res.product_quantity}</h1>
                    </div>
                  </div>
                  <h1>₹{res.product_finalTotal}</h1>
                </div>
              );
            })}
            <hr />
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Sub Total</div>
              <div>₹{couponPrice ? Number(couponPrice).toFixed(2).toLocaleString() : Number(finalPrice).toLocaleString()}</div>
            </div>
            {/* delivery charge   */}
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Delivery Charge</div>
              <div>₹{currentweightamout}</div>
            </div>
            {/* coupon percentage   */}
            {_.get(couponDiscount, "coupon_discount", "") && (
              <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
                <div>Coupon Discount</div>
                <div>{_.get(couponDiscount, "coupon_discount", "")} %</div>
              </div>
            )}
            {/* final total */}
            <hr />
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Final Total</div>
              <div>₹{(couponPrice ? Number(couponPrice) + Number(currentweightamout) : Number(finalPrice) + Number(currentweightamout))?.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const fetchData = async () => {
    try {
      const result = await Promise.all([getMyDeliveryAddress()]);
      setMyDeliveryAddress(_.get(result, "[0]data.data", ""));
      setSelectedDeliveryAddress(_.get(result, "[0]data.data[0]._id", ""));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paymentMethods = [
    {
      id: 1,
      name: "Online Payment",
      price: `${(couponPrice ? Number(couponPrice) + Number(currentweightamout) : Number(finalPrice) + Number(currentweightamout))?.toString()}`,
      icon: <SiWebmoney />,
    },
    {
      id: 2,
      price: `${(couponPrice ? Number(couponPrice) + Number(currentweightamout) : Number(finalPrice) + Number(currentweightamout) + codCharge)?.toString()}`,
      name: "Cash On Delivery",
      icon: <BsCashCoin />,
    },
  ];

  const handlePlace = async () => {
    try {
      setLoading(true);
      const formData = {
        productDetails: _.get(location, "state.cardData", []),
        deliveryAddress: myDeliveryAddress.filter((res) => res._id === selectedDeliveryAddress),
        paymentTotal: _.get(paymentMethods, "[1].price", ""),
        paymentType: paymentMethod,
        coupondiscountDetails: couponDiscount,
      };

      const result = await MakeOrder(formData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Order has been Placed",
        showConfirmButton: false,
        timer: 1500,
      });

      // Open the redirect URL if available
      if (result.data?.url) {
        window.open(result.data.url, "_blank");
      }

      navigate("/");
    } catch (err) {
      console.log(err);
      errorMessage("Failed to place order  ");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (paymentMethod === "Cash On Delivery") {
        return handlePlace();
      }

      const payload = {
        userDetails: userData.product.value,
        user_id: userData.product.value._id,
        productDetails: _.get(location, "state.cardData", []),
        deliveryAddress: myDeliveryAddress.find((res) => res._id === selectedDeliveryAddress),
        paymentTotal: _.get(paymentMethods, "[0].price", ""),
        paymentType: paymentMethod,
        coupondiscountDetails: couponDiscount,
      };

      const response = await MakeOrder(payload);
      const { redirectUrl, paymentRedirect } = response.data;

      if (!redirectUrl || !paymentRedirect) {
        throw new Error("Missing payment data");
      }

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Payment init error:", err);
      errorMessage("Payment Initialization Failed");
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  const PaymentDetails = () => {
    return (
      <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-10 pt-5">
        {/* payment Details */}
        <div className="w-full lg:w-[50%] min-h-[400px] rounded-lg">
          <h1 className="font-Poppins ">Delivery Address</h1>
          <DeliveryAddress
            res={myDeliveryAddress.filter((res) => {
              return res._id === selectedDeliveryAddress;
            })}
          />
          <h1 className="font-Poppins pt-4">Payment Details</h1>

          <div className="flex flex-col gap-y-3 pt-4 ">
            {_.get(location, "state.cardData", []).map((res, index) => {
              return (
                <div key={index} className="flex items-center justify-between pt-2 ">
                  <div>
                    <div className="flex items-center gap-x-2 text-sm">
                      <h1>{res.product_name}</h1>
                      <IconHelper.crossIcon style={{ color: res.variant_color }} />
                      <h1>{res.product_quantity}</h1>
                    </div>
                  </div>
                  <h1>₹{res.product_finalTotal}</h1>
                </div>
              );
            })}
            <hr />
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Sub Total</div>
              <div>₹{couponPrice ? Number(couponPrice).toFixed(2).toLocaleString() : Number(finalPrice).toLocaleString()}</div>
            </div>
            {/* delivery charge   */}
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Delivery Charge</div>
              <div>₹{currentweightamout}</div>
            </div>
            {/* coupon percentage   */}
            {_.get(couponDiscount, "coupon_discount", "") && (
              <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
                <div>Coupon Discount</div>
                <div>{_.get(couponDiscount, "coupon_discount", "")} %</div>
              </div>
            )}
            {/* final total */}
            <hr />
            <div className="flex items-center justify-between pt-2 font-Poppins text-sm">
              <div>Final Total</div>
              <div>₹{(couponPrice ? Number(couponPrice) + Number(currentweightamout) : Number(finalPrice) + Number(currentweightamout))?.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] min-h-[400px]">
          <h1 className="font-Poppins text-end">Select Payment Type</h1>
          <div className="pt-5 flex flex-col gap-y-4 w-full items-end">
            {paymentMethods.map((res, index) => {
              return (
                <Tag
                  color={paymentMethod === res.name ? "green" : ""}
                  onClick={() => {
                    setPaymentMethods(res.name);
                    setPaymentAmount(res.price);
                  }}
                  key={index}
                  className="flex items-center !m-0 cursor-pointer w-full lg:w-[400px] gap-x-3 h-[50px] lg:px-5"
                >
                  {res.icon}
                  {res.name}
                  <span className="font-bold text-sm"> ₹{res.price}</span>
                </Tag>
              );
            })}

            <Button onClick={handlePlaceOrder} className="w-full lg:w-[400px] h-[50px] bg-secondary text-white mt-10 lg:mt-20">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // pages

  let Item = [
    {
      id: 1,
      component: <NoDeliveryAddress />,
      name: "Delivery Address",
      icon: <IconHelper.deliveryIcon />,
    },
    {
      id: 2,
      component: <CouponDetails />,
      name: "Apply Coupon",
      icon: <IconHelper.couponIcon />,
    },
    {
      id: 3,
      component: <PaymentDetails />,
      name: "Payment",
      icon: <IconHelper.paymentIcon />,
    },
  ];

  return (
    <div className="w-screen min-h-screen pt-[10px] px-4 md:px-8 lg:px-16 py-10 !select-none">
      <Spin spinning={loading}>
        <div className="flex items-center justify-between pt-10">
          <h1 className="font-Poppins flex items-center gap-x-2">
            {Item[currentPage].icon}
            {Item[currentPage].name}
          </h1>
          <div className="flex items-center gap-x-4">
            {currentPage !== 0 && (
              <>
                <h1
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                  className="cursor-pointer font-Poppins flex items-center h-[50px] justify-center   text-sm"
                >
                  Back
                </h1>
                <Divider type="vertical" />
              </>
            )}
            {currentPage !== 2 && (
              <h1
                onClick={() => {
                  if (currentPage === 0 && !selectedDeliveryAddress) {
                    return errorMessage("Please select a delivery address");
                  }
                  setCurrentPage(currentPage + 1);
                }}
                className="cursor-pointer font-Poppins flex items-center gap-x-2 h-[50px] text-sm"
              >
                Next
              </h1>
            )}
          </div>
        </div>
        {/* checkout content */}
        <div className="w-full min-h-[50vh]">{Item[currentPage].component}</div>
      </Spin>
    </div>
  );
};

export default CheckoutScreen;
