/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import {
  ErrorNotification,
  errorMessage,
  successMessage,
} from "../../helper/notification_helper";
import _ from "lodash";
import {
  addToCart,
  client_url,
  collectMyWishList,
  getDeliveryCharges,
  getDeliveryforCustomerCharges,
  getMyCartsProduct,
  getSingleProduct,
  makeBulkRequests,
  makeComment,
  makeReviews,
} from "../../helper/api_helper";
import {
  findDiscountPercentage,
  getVariantPrice,
} from "../../helper/price_helper";
import IncreamentBox from "./IncreamentBox";
import { Button, Form, Input, Modal, Rate, Spin, Tabs } from "antd";
import {
  CaretUpFilled,
  CarTwoTone,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  ShopFilled,
  ShoppingCartOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import ProductExtra from "./ProductExtra";
import { emailRules, requiredRules } from "../../helper/form_validation";
import {
  CartStatus,
  getDeliveryChargesPrice,
} from "../../helper/filter_helper";
import { cardCount } from "../../redux/cartSlice";
import { ListCount } from "../../redux/favSlice";
import { useDispatch } from "react-redux";
import { IoBagOutline } from "react-icons/io5";
import { v4 as uuid4 } from "uuid";
import Helmet from "react-helmet";
import { FaXTwitter } from "react-icons/fa6";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { MakeLoginStatus } from "../../redux/logintriger";

const ProductDeatils = () => {
  const location = useHref();

  const [form] = Form.useForm();

  const [productDetails, setproductDetails] = useState();

  const [currentImage, setcurrentImage] = useState("");

  const [currentVariant, setCurrentVariant] = useState();

  const [loading, setLoading] = useState(false);

  const [makeBulkRequest, setMakeBulkRequest] = useState("");

  const [visible, setVisible] = useState(true);
  const [selectedRound, setSelectedRound] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // mogo
  const [allProducts, setAllProducts] = useState([]);
  const [ProductResult, setProductResult] = useState([]);

  // const [deliveryCharges, setDeliveryCharges] = useState([]);

  const [myCarProducts, setMyCartProducts] = useState([]);
  const [myFavoriteProducts, setMyFavoriteProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  // const [successMessage, setSuccessMessage] = useState(false);

  const [deliveryCharges, setDeliveryCharges] = useState([]);

  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getSingleProduct(
        _.get(location?.split("/"), "[2]", "")
      );
      setproductDetails(_.get(result, "data.data", []));
      setCurrentVariant(
        _.get(result, "data.data.product_variants[0].varient_unique_id", [])
      );
      setcurrentImage(_.get(result, "data.data.product_images[0][0]", []));
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(location?.split("/"), "[2]", "")]);

  // console.log(productDetails);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleFormChange = (value) => {
    try {
      if (!localStorage.getItem("customers_token")) {
        return dispatch(
          MakeLoginStatus({
            count: "Login",
          })
        );
      }
      setMakeBulkRequest(value);
    } catch (err) {}
  };

  const sendBulkRequest = async (values) => {
    try {
      if (makeBulkRequest === "bulk_request") {
        const formData = {
          product_id: _.get(productDetails, "_id", ""),
          product_variant_id: currentVariant,
          count: values?.count,
        };
        await makeBulkRequests(formData);
        successMessage("Request Sent Successfully");
        setMakeBulkRequest("");
      } else if (makeBulkRequest === "add_comment") {
        const formData = {
          variant_id: currentVariant,
          message: values.message,
        };

        makeComment(formData);
        successMessage("Comment Added");
        setDummy(!dummy);
        setMakeBulkRequest("");
        setCurrentVariant(currentVariant);
      } else {
        const formData = {
          variant_id: currentVariant,
          review: values.review,
          ratings: values.ratings,
        };
        await makeReviews(formData);
        successMessage("Review Added");
        setDummy(!dummy);
        setMakeBulkRequest("");
        setCurrentVariant(currentVariant);
      }
      form.resetFields();
    } catch (err) {
      errorMessage("something went wrong");
    }
  };

  const handleCancel = () => {
    try {
      form.resetFields();
      setMakeBulkRequest("");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = () => {
    switch (makeBulkRequest) {
      case "bulk_request":
        return {
          heading: "Make a bulk request",
          btnText: "Send Request",
        };
      case "add_comment":
        return {
          heading: "Add Your comment",
          btnText: "Post Comment",
        };
      case "add_review":
        return {
          heading: "Add Your review",
          btnText: "Post Review",
        };
    }
  };

  const fetchCardData = async () => {
    try {
      console.log("enter");
      setLoading(true);
      const result = await Promise.all([
        getMyCartsProduct(),
        collectMyWishList(),
        getDeliveryforCustomerCharges(),
      ]);

      console.log(result, "ghjy");
      setMyCartProducts(_.get(result, "[0].data.data", []));
      dispatch(cardCount({ count: _.get(result, "[0].data.data", []).length }));

      setMyFavoriteProducts(_.get(result, "[1].data.data", []));
      dispatch(ListCount({ count: _.get(result, "[1].data.data", []).length }));
      setDeliveryCharges(_.get(result, "[2].data.data", []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleAddtocard = async (product_id) => {
    try {
      if (!localStorage.getItem("customers_token")) {
        return dispatch(
          MakeLoginStatus({
            count: "Login",
          })
        );
      }
      setLoading(true);
      if (CartStatus(myCarProducts, currentVariant)) {
        setLoading(false);
        return navigate("/my_cart");
      }
      let formData = {
        variant_id: currentVariant,
        product_id: product_id,
      };

      await addToCart(formData);
      successMessage("Product Added to the Cart");
      fetchCardData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuySingleProduct = (product_id) => {
    if (!localStorage.getItem("customers_token")) {
      return dispatch(
        MakeLoginStatus({
          count: "Login",
        })
      );
    }
    let formData = {
      variant_id: currentVariant,
      product_name: _.get(productDetails, "product_name", ""),
      product_selling_price: Number(
        getVariantPrice(currentVariant, productDetails)?.mogo_selling_price
      ).toLocaleString(),
      product_mrp_price: Number(
        getVariantPrice(currentVariant, productDetails)?.mogo_mrp_price
      ).toLocaleString(),

      vendor_product_selling_price: Number(
        getVariantPrice(currentVariant, productDetails)?.vendor_selling_price
      ).toLocaleString(),
      vendor_product_mrp_price: Number(
        getVariantPrice(currentVariant, productDetails)?.vendor_mrp_price
      ).toLocaleString(),

      product_image: currentImage,
      subcategory_id: _.get(productDetails, "product_sub_category_name", ""),
      product_quantity: quantity,
      product_finalTotal: Number(
        getVariantPrice(currentVariant, productDetails)?.mogo_selling_price *
          quantity
      ).toLocaleString(),
      vendor_product_finalTotal: Number(
        getVariantPrice(currentVariant, productDetails)?.vendor_selling_price *
          quantity
      ).toLocaleString(),

      vendor_id: _.get(productDetails, "user_id._id", ""),
      vendor_store: _.get(productDetails, "user_id.company_name", ""),
      order_status: "confirmed",
      invoice_no: `MOGO${uuid4().slice(0, 6)}`,
      variant_color: _.get(
        getVariantPrice(currentVariant, productDetails),
        "product_variant_color",
        ""
      ),
      product_id: product_id,
      deliveryCharge: getDeliveryChargesPrice(
        deliveryCharges,
        _.get(
          getVariantPrice(currentVariant, productDetails),
          "product_weight",
          ""
        )
      ),
    };
    navigate("/checkout", {
      state: {
        cardData: [formData],
      },
    });
  };

  let url = `${client_url}${location}`;

  return (
    <Spin spinning={loading} className="!w-screen !h-screen center_div">
      <Helmet>
        <title>{_.get(productDetails, "product_name", [])}</title>
        <meta
          property="og:title"
          content={_.get(productDetails, "product_name", [])}
        />
        <meta
          property="og:description"
          content={_.get(productDetails, "product_descriptions", [])}
        />
        <meta property="og:image" content={currentImage} />
        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content={_.get(productDetails, "product_name", [])}
        />
        <meta
          property="twitter:description"
          content={_.get(productDetails, "product_descriptions", [])}
        />
        <meta property="twitter:image" content={currentImage} />
      </Helmet>
      <div className="min-h-screen pb-10 w-full px-4 md:px-8 lg:px-16 py-10 ">
        <div className="w-full flex flex-col lg:flex-row items-center gap-5 lg:gap-10">
          <div className="w-full lg:w-[40%] h-auto lg:h-[500px] relative">
            <img src={currentImage} className="w-full h-full rounded-lg" />
            <div className="w-[80px] h-fit bg-white  shadow-inner  py-1 absolute right-10 bottom-10">
              {_.get(productDetails, "product_images", []).map((res, index) => {
                return (
                  <img
                    src={res}
                    key={index}
                    onMouseEnter={() => {
                      setcurrentImage(res);
                    }}
                    className="rounded cursor-pointer p-1 w-[75px] h-[75px] mx-auto hover:scale-110 hover:rounded-lg transition-all duration-500"
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-[50%] min-h-[300px] lg:min-h-[500px]">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-Poppins">
              {_.get(productDetails, "product_name", "")}
            </h1>
            <div className="flex flex-col gap-4 lg:gap-8 pt-2">
              <p className="text-slate-400 text-sm">
                By {_.get(productDetails, "user_id.company_name", "")}
              </p>

              {/* prices */}
              <div className="flex items-center gap-x-3 font-Poppins pt-2">
                <p className="text-gray-300 line-through">
                  ₹
                  {Number(
                    getVariantPrice(currentVariant, productDetails)
                      ?.mogo_mrp_price
                  ).toLocaleString()}
                </p>{" "}
                <p>
                  ₹
                  {Number(
                    getVariantPrice(currentVariant, productDetails)
                      ?.mogo_selling_price
                  ).toLocaleString()}
                </p>
                <p className="bg-red-500 p-1 rounded text-white text-[12px] px-3">
                  {findDiscountPercentage(
                    currentVariant,
                    productDetails
                  )?.toFixed(2)}
                  %
                </p>
              </div>

              <div className="flex flex-col gap-y-3">
                <div className="flex items-center">
                  <p className="text-slate-400 text-sm w-[100px]">Status</p>
                  <p
                    className={`${
                      getVariantPrice(currentVariant, productDetails)
                        ?.stock_status
                        ? "text-secondary"
                        : "text-red-500"
                    }`}
                  >
                    {getVariantPrice(currentVariant, productDetails)
                      ?.stock_status === "IN-STOCK"
                      ? `In Stock (${
                          getVariantPrice(currentVariant, productDetails)
                            ?.stock_count
                        })`
                      : "Out Stock"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-slate-400 text-sm w-[100px]">SKU</p>
                  <p>
                    {getVariantPrice(
                      currentVariant,
                      productDetails
                    )?.varient_unique_id?.slice(0, 8)}
                  </p>
                </div>
              </div>
              {/* variants */}
              <div className="flex items-center gap-x-4 flex-wrap pt-2">
                {_.get(productDetails, "product_variants", []).map(
                  (res, index) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentVariant(res.varient_unique_id);
                        }}
                        key={index}
                        className={`w-[30px] h-[30px] rounded-md center_div  shadow-inner  cursor-pointer 
                        ${
                          res.varient_unique_id === currentVariant
                            ? "border-gray-200 border-2"
                            : "bg-white"
                        }`}
                      >
                        <div
                          style={{
                            backgroundColor: res.product_variant_color,
                          }}
                          className="w-[80%] h-[80%] rounded"
                        ></div>
                      </div>
                    );
                  }
                )}
              </div>
              {/* add to cart */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-wrap lg:flex-row items-center gap-3">
                  <IncreamentBox
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button
                    onClick={() => {
                      handleAddtocard(_.get(productDetails, "_id", ""));
                    }}
                    icon={<ShoppingCartOutlined />}
                    className="!h-[40px] bg-primary text-white hover:!border-primary hover:!text-primary"
                  >
                    {CartStatus(myCarProducts, currentVariant)
                      ? "Go to Cart"
                      : "Add To Cart"}
                  </Button>
                  <Button
                    onClick={() => {
                      handleBuySingleProduct(_.get(productDetails, "_id", ""));
                    }}
                    icon={<IoBagOutline />}
                    className="!h-[40px] bg-secondary text-white hover:!border-primary hover:!text-primary"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => {
                      handleFormChange("bulk_request");
                    }}
                    // icon={<ShoppingCartOutlined />}
                    className="!h-[40px] bg-secondary text-white hover:!border-secondary hover:!text-secondary"
                  >
                    Bulk Request
                  </Button>
                </div>
              </div>
              {/* share */}
              <div className="flex items-center gap-x-4 pt-4">
                <h1>Share</h1>
                <div className="flex gap-x-5 items-center">
                  {/* <LinkedinShareButton
                    url={url}
                    title={_.get(productDetails, "product_name", "")}
                    className="social-share-button"
                    message={_.get(productDetails, "product_descriptions", "")}
                  >
                    <LinkedinOutlined size={32} round />
                  </LinkedinShareButton> */}
                  <TwitterShareButton
                    url={url}
                    title={_.get(productDetails, "product_name", "")}
                    className="social-share-button"
                    message={_.get(productDetails, "product_descriptions", "")}
                  >
                    <FaXTwitter round />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={url}
                    quote={_.get(productDetails, "product_name", "")}
                    className="social-share-button"
                    message={_.get(productDetails, "product_descriptions", "")}
                  >
                    <FacebookOutlined size={32} round />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={url}
                    title={_.get(productDetails, "product_name", "")}
                    className="social-share-button"
                    message={_.get(productDetails, "product_descriptions", "")}
                  >
                    <WhatsAppOutlined size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full min-h-[300px] pt-10">
          {dummy ? (
            <ProductExtra
              productDetails={productDetails}
              currentVariant={currentVariant}
              setMakeBulkRequest={setMakeBulkRequest}
              handleFormChange={handleFormChange}
              dummy={dummy}
              setDummy={setDummy}
            />
          ) : (
            <ProductExtra
              productDetails={productDetails}
              currentVariant={currentVariant}
              handleFormChange={handleFormChange}
              setMakeBulkRequest={setMakeBulkRequest}
              dummy={dummy}
              setDummy={setDummy}
            />
          )}
        </div>
      </div>
      <Modal
        open={makeBulkRequest}
        footer={false}
        title={getText()?.heading}
        closable={false}
        width={makeBulkRequest === "bulk_request" ? 400 : 600}
        onCancel={handleCancel}
        destroyOnClose
      >
        <div className="center_div w-full">
          <Form
            layout="vertical"
            className="pt-2 !w-full"
            onFinish={sendBulkRequest}
            form={form}
          >
            {makeBulkRequest === "bulk_request" && (
              <Form.Item
                className="!w-full"
                label="Required Count"
                name="count"
                rules={[requiredRules("Please Enter Required Count")]}
              >
                <Input
                  className="antd_input2 !w-full"
                  type="number"
                  placeholder="Required Count"
                />
              </Form.Item>
            )}

            {makeBulkRequest === "add_review" && (
              <div className="flex flex-col gap-y-2 !w-full">
                <Form.Item
                  className="!w-full"
                  label="Ratings"
                  name="ratings"
                  rules={[requiredRules("Please Select Your Ratings")]}
                >
                  <Rate allowHalf className="w-full" />
                </Form.Item>
                <Form.Item
                  // className="form_item"
                  label="Review"
                  name="review"
                  rules={[requiredRules("Please write your review")]}
                >
                  <Input.TextArea
                    cols={10}
                    className="!h-[100px] !w-full"
                    placeholder="write your review"
                  />
                </Form.Item>
              </div>
            )}

            {makeBulkRequest === "add_comment" && (
              <div className="flex flex-col gap-y-2">
                <Form.Item
                  // className="form_item"
                  label="Comment"
                  name="message"
                  rules={[requiredRules("Please write your comments")]}
                >
                  <Input.TextArea
                    cols={10}
                    className="!h-[100px]"
                    placeholder="write your comments"
                  />
                </Form.Item>
              </div>
            )}

            <Form.Item className="form_item">
              <Button
                block
                htmlType="submit"
                className="!h-[37px] !w-full mt-4 bg-secondary !border-none !outline-none text-white hover:!text-white hover:!bg-primary"
                placeholder="Select Zipcode"
                loading={loading}
              >
                {getText()?.btnText}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Spin>
  );
};

export default ProductDeatils;
