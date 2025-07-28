import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { getAllOrders, updateOrderStatus } from "../../../helper/api_helper";
import { ErrorNotification, SuccessNotification } from "../../../helper/notification_helper";
import _ from "lodash";
import { Badge, Image, Select } from "antd";

import moment from "moment";

import { useSelector } from "react-redux";
import { getAvailableList } from "../../../helper/filter_helper";
import Preloader from "../../../component/Preloader";
import { checkCouponIncludedOrNot } from "../../../helper/price_helper";

const Order = () => {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((data) => data);

  // userData.role.currentRole._id;
  // console.log(userData.role.currentRole._id);

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const result = await getAllOrders();
      setStoreData(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, [_.get(userData, "role.currentRole._id", "")]);

  // const columns = [
  //   {
  //     title: "S.No",
  //     align: "center",
  //     width: 20,
  //     render: (data, allData, index) => {
  //       return <h1 className="font-bold">{index + 1}</h1>;
  //     },
  //   },
  //   {
  //     title: "Order ID",
  //     dataIndex: "_id",
  //     render: (data) => {
  //       return <div>{data}</div>;
  //     },
  //   },
  //   {
  //     title: "Customer Name",
  //     dataIndex: "userDetails",
  //     render: (data) => {
  //       return <h1 className="font-bold">{_.get(data, "[0].name", "")}</h1>;
  //     },
  //   },
  //   {
  //     title: "Order Status",
  //     dataIndex: "order_status",
  //     render: (data, all) => {
  //       return (
  //         <>
  //           {_.get(userData, "role.currentRole.role", "") === "admin" ? (
  //             <Tag
  //               className={`border-none text-[14px] !text-right ${
  //                 data === "Delivered" ? "!text-primary" : "!text-secondary"
  //               } `}
  //             >
  //               {data}
  //             </Tag>
  //           ) : (
  //             <Tag
  //               onClick={() => {
  //                 setOrderDetails(all);
  //               }}
  //               className="details bg-secondary text-white"
  //             >
  //               Update Status
  //             </Tag>
  //           )}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     title: "Payment Type",
  //     dataIndex: "paymentType",
  //   },
  //   // {
  //   //   title: "Order Status",

  //   //   render: (data) => {
  //   //     return (
  //   //       <Tag
  //   //         onClick={() => {
  //   //           setOrderDetails(data);
  //   //         }}
  //   //         className="details bg-secondary text-white"
  //   //       >
  //   //         Update Status
  //   //       </Tag>
  //   //     );
  //   //   },
  //   // },
  //   {
  //     title: "Payment Total",
  //     dataIndex: "paymentTotal",
  //     render: (data) => {
  //       return (
  //         <h1 className="text-yellow-500 text-[14px]">
  //           ₹ {data.toLocaleString()}
  //         </h1>
  //       );
  //     },
  //   },
  //   {
  //     title: "Order Created",
  //     dataIndex: "CreatedAt",
  //     render: (data) => {
  //       return moment(data).format("DD MMM YYYY - HH:mm A");
  //     },
  //   },
  //   {
  //     title: "Details",
  //     render: () => {
  //       return (
  //         <Tag className="details">
  //           <CiCircleInfo size={15} /> details
  //         </Tag>
  //       );
  //     },
  //   },
  // ];

  const handleStatusChange = async (value, id, invoice_no, user_id) => {
    try {
      setLoading(true);
      const formData = {
        order_id: id,
        order_status: value,
        invoice: invoice_no,
        user_id: user_id,
      };
      const result = await updateOrderStatus(formData);
      fetchAllStores();
      SuccessNotification(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(storeData);

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader name="Orders" Icon={IconHelper.orderIcon} vendorShown={false} />
      {console.log(_.get(userData, "role.currentRole.role", ""))}
      <div className="flex flex-wrap gap-4">
        {loading ? (
          <Preloader />
        ) : (
          <>
            {storeData?.map((res) => {
              return _.get(res, "productDetails", []).map((result, index) => {
                return (
                  (_.get(userData, "role.currentRole.role", "") === "admin" ? true : _.get(userData, "role.currentRole._id", "") === _.get(result, "vendor_id", "")) && (
                    <Badge.Ribbon text={<>₹ {Number(checkCouponIncludedOrNot(res, result)).toLocaleString()}</>} placement="start" key={index} color="#6aac43">
                      <div className="w-[280px] min-h-[100px] bg-white shadow pb-2 !font-Poppins  rounded-lg">
                        <div className="relative">
                          <Image src={_.get(result, "product_image", "")} className="!w-[280px] !h-[200px] rounded-lg p-1" />
                          {/* <Tag className="absolute bottom-4 right-0 bg-primary !text-white !border-transparent !cursor-pointer">
                            view Invoice
                          </Tag> */}
                        </div>

                        <div className="px-3 flex flex-col gap-y-4 py-2">
                          <div className="flex gap-2">
                            <h1 className="text-[12px] text-gray-600 w-[30%]">Invoice no</h1>
                            <h1 className="text-[12px] ">:&nbsp; {_.get(result, "invoice_no", "")}</h1>
                          </div>

                          <div className="flex gap-2">
                            <h1 className="text-[12px] text-gray-600 w-[30%]">Quantity</h1>
                            <h1 className="text-[12px] ">:&nbsp; {_.get(result, "product_quantity", "")}</h1>
                          </div>
                          <div className="flex gap-2">
                            <h1 className="text-[12px] text-gray-600 w-[30%]">Date</h1>
                            <h1 className="text-[12px] ">:&nbsp; {moment(_.get(res, "createdAt", "")).format("DD.MM.YYYY")}</h1>
                          </div>
                          <div className="flex gap-2">
                            <h1 className="text-[12px] text-gray-600 w-[30%]">Product</h1>
                            <h1 className="text-[12px]  line-clamp-2 overflow-hidden">:&nbsp; {_.get(result, "product_name", "")}</h1>
                          </div>

                          {_.get(result, "order_status", "") === "Delivered" ? (
                            <h1 className="!h-[40px] center_div !text-secondary">Delivered</h1>
                          ) : _.get(result, "order_status", "") === "Cancelled" ? (
                            <h1 className="!h-[40px] center_div !text-red-500">Cancelled</h1>
                          ) : _.get(userData, "role.currentRole.role", "") === "admin" ? (
                            <h1 className="!h-[40px] center_div !text-primary">
                              {_.get(result, "order_status", "")}
                            </h1>
                          ) : (
                            <Select
                              style={{ border: "none" }}
                              className="w-[100%] antd_input2 !h-[40px] !rounded-none"
                              onChange={(status) =>
                                handleStatusChange(
                                  status,
                                  res._id,
                                  _.get(result, "invoice_no", ""),
                                  _.get(res, "userDetails[0].id", "")
                                )
                              }
                              value={_.get(result, "order_status", "")}
                            >
                              {getAvailableList(_.get(result, "order_status", ""))?.map((option, index) => (
                                <Select.Option key={index} value={option.name}>
                                  <p className="!text-[14px] !line-clamp-1">{option.name}</p>
                                </Select.Option>
                              ))}
                            </Select>
                          )}

                        </div>
                      </div>
                    </Badge.Ribbon>
                  )
                );
              });
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
