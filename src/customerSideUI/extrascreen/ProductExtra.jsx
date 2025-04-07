/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Avatar, Card, Empty, Rate, Tabs } from "antd";
import _ from "lodash";
import { getVariantPrice } from "../../helper/price_helper";
import { useEffect, useState } from "react";
import { ErrorNotification } from "../../helper/notification_helper";
import {
  getSingleVariantComments,
  getSingleVariantReview,
} from "../../helper/api_helper";
import Meta from "antd/es/card/Meta";

const ProductExtra = ({
  currentVariant,
  productDetails,
  setMakeBulkRequest,
  handleFormChange,
  dummy,
  setDummy,
}) => {
  const [currentReviews, setCurrentReviews] = useState([]);
  const [currentComments, setCurrentComments] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const result = await getSingleVariantComments(currentVariant);
      const result2 = await getSingleVariantReview(currentVariant);
      setCurrentComments(_.get(result, "data.data", []));
      setCurrentReviews(_.get(result2, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [currentVariant, dummy]);

  const AdditionalInfo = () => {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <div className="w-[200px] py-1 px-2 text-lg text-gray-800">
            MRP Price
          </div>
          <div className="font-Poppins">
            ₹{" "}
            {Number(
              getVariantPrice(currentVariant, productDetails)?.mogo_mrp_price
            )?.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px] py-1 px-2 text-lg text-gray-800">
            Selling Price
          </div>
          <div className="font-Poppins">
            ₹{" "}
            {Number(
              getVariantPrice(currentVariant, productDetails)
                ?.mogo_selling_price
            )?.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px] py-1 px-2 text-lg text-gray-800">
            Product Weight
          </div>
          <div className="font-Poppins">
            {Number(
              getVariantPrice(currentVariant, productDetails)?.product_weight
            )?.toLocaleString()}{" "}
            KG
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px] py-1 px-2 text-lg text-gray-800">
            Product Brand
          </div>
          <div className="font-Poppins">{productDetails?.product_brand_id}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[200px] py-1 px-2 text-lg text-gray-800">
            Product Fabric Type
          </div>
          <div className="font-Poppins">
            {productDetails?.product_fabric_id}
          </div>
        </div>
      </div>
    );
  };

  const productReview = () => {
    return (
      <div className="flex justify-end flex-wrap gap-y-4">
        <div
          className="px-3 py-1 bg-secondary w-fit text-white rounded cursor-pointer"
          onClick={() => {
            
            handleFormChange("add_review")
          }}
        >
          Add Review
        </div>
        {_.isEmpty(currentReviews) ? (
          <div className="w-full">
            <Empty />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-between !w-full">
            {currentReviews.map((res, index) => {
              return (
                <div key={index} className="w-full lg:w-[49%]">
                  <Card
                    className="!w-[100%] h-[150px] py-2"
                    loading={loading}
                    hoverable
                  >
                    <Meta
                      avatar={
                        _.get(res, "user_id.user_profile", "") ? (
                          <Avatar
                            src={_.get(res, "user_id.user_profile", "")}
                          />
                        ) : (
                          <Avatar
                            style={{
                              background: _.get(
                                res,
                                "user_id.profile_color",
                                ""
                              ),
                            }}
                          >
                            {_.get(res, "user_id.user_name", "")
                              .split("")[0]
                              ?.toUpperCase()}
                          </Avatar>
                        )
                      }
                      title={
                        <div className="font-Poppins capitalize">
                          {_.get(res, "user_id.user_name", "")}
                        </div>
                      }
                      description={
                        <div className="!w-full flex flex-col gap-y-2">
                          <Rate disabled value={_.get(res, "ratings", "")} />
                          {_.get(res, "review", "")}
                        </div>
                      }
                    />
                  </Card>
                  <div></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const productComments = () => {
    return (
      <div className="flex justify-end flex-wrap gap-y-4">
        <div
          className="px-3 py-1 bg-secondary w-fit text-white rounded cursor-pointer"
          onClick={() => {
            
            handleFormChange("add_comment")

          }}
        >
          Add Comments
        </div>
        {_.isEmpty(currentComments) ? (
          <div className="w-full">
            <Empty />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-between !w-full">
            {currentComments.map((res, index) => {
              return (
                <div key={index} className="w-full lg:w-[49%]">
                  <Card
                    className="!w-[100%] h-[150px] py-2"
                    loading={loading}
                    hoverable
                  >
                    <Meta
                      avatar={
                        _.get(res, "user_id.user_profile", "") ? (
                          <Avatar
                            src={_.get(res, "user_id.user_profile", "")}
                          />
                        ) : (
                          <Avatar
                            style={{
                              background: _.get(
                                res,
                                "user_id.profile_color",
                                ""
                              ),
                            }}
                          >
                            {_.get(res, "user_id.user_name", "")
                              .split("")[0]
                              ?.toUpperCase()}
                          </Avatar>
                        )
                      }
                      title={
                        <div className="font-Poppins capitalize">
                          {_.get(res, "user_id.user_name", "")}
                        </div>
                      }
                      description={
                        <div className="!w-full">
                          {_.get(res, "message", "")}
                        </div>
                      }
                    />
                  </Card>
                  <div></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Description",
      children: (
        <div className="leading-relaxed text-[18px] indent-4">
          {_.get(productDetails, "product_descriptions")}
        </div>
      ),
    },
    {
      key: "2",
      label: "Additional Information",
      children: AdditionalInfo(),
    },
    {
      key: "3",
      label: "Review",
      children: productReview(),
    },
    {
      key: "4",
      label: "Comments",
      children: productComments(),
    },
  ];

  return (
    <div>
      {dummy ? (
        <Tabs
          forceRender={true}
          destroyInactiveTabPane
          defaultActiveKey="1"
          size="large"
          type="line"
          items={items}
        />
      ) : (
        <Tabs
          forceRender={true}
          destroyInactiveTabPane
          defaultActiveKey="1"
          size="large"
          type="line"
          items={items}
        />
      )}
    </div>
  );
};

export default ProductExtra;
