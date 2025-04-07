import { Button, Divider, Form, Input, Spin, Tag } from "antd";
import { IconHelper } from "../../helper/IconHelper";
import { useEffect, useState } from "react";
import { ErrorNotification, errorMessage, successMessage } from "../../helper/notification_helper";
import { MakeOrder, getMyDeliveryAddress, veriFyCoupon } from "../../helper/api_helper";
import _ from "lodash";
import { ImHome3 } from "react-icons/im";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { MdNavigateNext, MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
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

  const location = useLocation();

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

  // const handleVerifyCoupon = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await veriFyCoupon(couponCode);
  //     if (_.isEmpty(_.get(result, 'data.data', []))) {
  //       return setError('Invalid Coupon Code');
  //     }
  //     // let applyDiscount =
  //     //   (Number(_.get(result, 'data.data.coupon_discount', '')) *
  //     //     getFinalPrice(_.get(route, 'params.state', []))) /
  //     //   100;
  //     // console.log(
  //     //   getFinalSoloPrice(
  //     //     _.get(route, 'params.state', []),
  //     //     _.get(result, 'data.data.coupon_discount', ''),
  //     //   ),
  //     // );

  //     setCouponPrice(
  //       getFinalSoloPrice(
  //         _.get(route, 'params.state', []),
  //         _.get(result, 'data.data.coupon_discount', ''),
  //       ),
  //     );
  //     setCouponDiscount(_.get(result, 'data.data', ''));
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRemoveCoupon = () => {
    if (couponPrice) {
      setCouponPrice("");

      setCouponDiscount("");
    }
  };

  const handleFinish = async (values) => {
    try {
      console.log(values);
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
              <div>₹{Number(getDeliveryChargeTotal(_.get(location, "state.cardData", [])))}</div>
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
              <div>₹{(couponPrice ? Number(couponPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))) : Number(finalPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))))?.toLocaleString()}</div>
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

  // console.log(myDeliveryAddress);

  useEffect(() => {
    fetchData();
  }, []);

  const paymentMethods = [
    {
      id: 1,
      name: "Online Payment",
      icon: <SiWebmoney />,
    },
    {
      id: 2,
      name: "Cash On Delivery",
      icon: <BsCashCoin />,
    },
  ];

  const handlePlaceOrder = async () => {
    try {
      // if (paymentMethod === "Cash On Delivery") {
      return handlePlace();
      // }
      // var options = {
      //   key: "rzp_test_Wdan8rh6RM6vWP",
      //   key_secret: "iExGzM7nCvTIo41Rk4iV9kye",
      //   amount:
      //     (couponPrice
      //       ? Number(couponPrice) +
      //         Number(
      //           getDeliveryChargeTotal(_.get(location, "state.cardData", []))
      //         )
      //       : Number(finalPrice) +
      //         Number(
      //           getDeliveryChargeTotal(_.get(location, "state.cardData", []))
      //         )) * 100,
      //   image:
      //     "https://themogo.com/static/media/brnad_logo.9d35cee3b0aa4a18a9f6.png",
      //   currency: "INR",
      //   name: "MOGO",
      //   description: "for testing purpose",
      //   handler: function (response) {
      //     handlePlace();
      //   },
      //   prefill: {
      //     email: _.get(userData, "product.value.email", ""),
      //     contact: _.get(userData, "product.value.mobile", ""),
      //     name: _.get(userData, "product.value.name", ""),
      //   },
      //   notes: {
      //     address: "Razorpay Corporate office",
      //   },
      //   theme: {
      //     color: "#6aac43",
      //   },
      // };
      // var pay = new window.Razorpay(options);
      // pay.open();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
      console.log("dployfgix");
    }
  }, [paymentUrl]);

  const handlePlace = async () => {
    try {
      setLoading(true);
      const formData = {
        productDetails: _.get(location, "state.cardData", []),
        deliveryAddress: myDeliveryAddress.filter((res) => {
          return res._id === selectedDeliveryAddress;
        }),
        paymentTotal: (couponPrice ? Number(couponPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))) : Number(finalPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))))?.toString(),
        paymentType: paymentMethod,
        coupondiscountDetails: couponDiscount,
      };

      const result = await MakeOrder(formData);
  
      setPaymentUrl(result.data.url);
      window.open = result.data.url;
      navigate(`${result.data.url}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Order has been Placed",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
              <div>₹{Number(getDeliveryChargeTotal(_.get(location, "state.cardData", [])))}</div>
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
              <div>₹{(couponPrice ? Number(couponPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))) : Number(finalPrice) + Number(getDeliveryChargeTotal(_.get(location, "state.cardData", []))))?.toLocaleString()}</div>
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
                  }}
                  key={index}
                  className="flex items-center !m-0 cursor-pointer w-full lg:w-[400px] gap-x-3 h-[50px] lg:px-5"
                >
                  {res.icon}
                  {res.name}
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
      <Spin spinning={false}>
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
