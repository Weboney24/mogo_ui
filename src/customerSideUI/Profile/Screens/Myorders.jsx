/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../../helper/notification_helper";
import { getMyOrderDetails } from "../../../helper/api_helper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import _ from "lodash";
import { Avatar, Card, Drawer, Modal, Tag } from "antd";
import moment from "moment";
import { checkCouponIncludedOrNot } from "../../../helper/price_helper";
import TrackOrder from "./TrackOrder";
import { ImageHelper } from "../../../helper/ImageHelper";
import { IconHelper } from "../../../helper/IconHelper";

const Myorders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackorder_id, setTrackOrder_id] = useState("");
  const [trackinvoice, settrackInvoice] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyOrderDetails();
      setOrderDetails(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleTrackOrder = (orderData, invoiceData) => {
    try {
      let formData = {
        invoice_id: _.get(invoiceData, "invoice_no", ""),
        order_date: moment(_.get(orderData, "createdAt", [])).format("D MMM yyyy"),
        total_amount: checkCouponIncludedOrNot(orderData, invoiceData),
        delivery_address: _.get(orderData, "deliveryAddress", []),
      };
      setTrackOrder_id(formData);
    } catch (err) {}
  };

  const handleInvoice = (orderData, invoiceData) => {
    try {
      let formData = {
        invoice_id: _.get(invoiceData, "invoice_no", ""),
        order_date: moment(_.get(orderData, "createdAt", [])).format("D MMM yyyy"),
        total_amount: checkCouponIncludedOrNot(orderData, invoiceData),
        delivery_address: _.get(orderData, "deliveryAddress", []),
        product_details: _.get(orderData, "productDetails.[0]", []),
        user_details: _.get(orderData, "userDetails.[0]", []),
        paymentType: _.get(orderData, "paymentType", ""),
        order_status: _.get(orderData, "order_status", ""),
      };
      settrackInvoice(formData);
      showModal();
    } catch (err) {}
  };

  const handleDownloadPDF = () => {
    const invoiceElement = document.getElementById("invoice");

    html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save(`Invoice_${_.get(trackinvoice, "invoice_id", "Unknown")}.pdf`);
    });
  };

  let orderItemsColumns = [
    {
      title: "Image",
      value: <img src={_.get(trackinvoice, "product_details.product_image", "")} alt="" className="w-[100px] h-[80px] rounded" />,
    },
    {
      title: "Item",
      value: (
        <h3 className="flex flex-col py-4 capitalize text-center">
          <div>{_.get(trackinvoice, "product_details.category_name", "")}</div>
          <div>{_.get(trackinvoice, "product_details.product_name", "")}</div>
          <div>{_.get(trackinvoice, "product_details.product_image", "").slice(0, 20)}...</div>
        </h3>
      ),
    },
    {
      title: "Price",
      value: (
        <h3 className="flex flex-col py-4">
          <div>₹ {_.get(trackinvoice, "product_details.product_mrp_price", "")}</div>
        </h3>
      ),
    },
    {
      title: "Quantity",
      value: (
        <h3 className="flex flex-col py-4">
          <div>{_.get(trackinvoice, "product_details.product_quantity", "")}</div>
        </h3>
      ),
    },
    {
      title: "Total",
      value: (
        <h3 className="flex flex-col py-4 text-end items-end justify-end ">
          <div>₹ {_.get(trackinvoice, "product_details.product_mrp_price", "")}</div>
        </h3>
      ),
    },
  ];

  let subTotalColumns = [
    {
      title: "Subtotal",
      value: `₹ ${_.get(trackinvoice, "product_details.product_mrp_price", "")}`,
    },
    {
      title: "Grand Total",
      value: `₹ ${_.get(trackinvoice, "product_details.product_finalTotal", "")}`,
    },
  ];

  return (
    <div>
      <h1 className="font-Poppins">My Orders</h1>
      <div className="w-full flex flex-wrap gap-2 justify-between">
        {orderDetails.map((res) => {
          return _.get(res, "productDetails", []).map((result, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={{
                  width: 300,
                  marginTop: 16,
                }}
                loading={loading}
                extra={<div>{moment(_.get(res, "createdAt", [])).format("D MMM yyyy")}</div>}
                title={<div className="text-[12px] text-primary line-clamp-1 w-[80%]">{_.get(result, "order_status", "")}</div>}
                actions={[
                  <div onClick={() => handleTrackOrder(res, result)} className="font-Poppins text-secondary">
                    Track Order
                  </div>,
                  <div onClick={() => handleInvoice(res, result)} className="font-Poppins text-primary">
                    Invoice
                  </div>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar size={"large"} src={result.product_image} />}
                  title={<h1 className="line-clamp-1">{result.product_name}</h1>}
                  description={
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-2 text-black text-sm">
                        <h1 className="w-[50%] text-gray-800">Invoice No</h1>
                        <h1 className="w-[50%] text-gray-800">{_.get(result, "invoice_no", "")}</h1>
                      </div>
                      <div className="flex gap-x-2 text-black text-sm">
                        <h1 className="w-[50%] text-gray-800">Quantity</h1>
                        <h1 className="w-[50%] text-gray-800">{_.get(result, "product_quantity", "")}</h1>
                      </div>
                      <div className="flex gap-x-2 text-black text-sm">
                        <h1 className="w-[50%] text-gray-800">Total Amount</h1>
                        <h1 className="w-[50%] text-gray-800"> ₹{checkCouponIncludedOrNot(res, result).toLocaleString()}</h1>
                      </div>
                    </div>
                  }
                />
              </Card>
            );
          });
        })}
      </div>
      <Drawer
        open={!_.isEmpty(trackorder_id)}
        title={<div className="font-Poppins text-sm">Invoice No : {trackorder_id.invoice_id} </div>}
        extra={<div className="font-Poppins text-sm text-secondary">₹{trackorder_id.total_amount?.toLocaleString()} </div>}
        closable={false}
        onClose={() => {
          setTrackOrder_id({});
        }}
      >
        <TrackOrder order_id={trackorder_id} />
      </Drawer>

      <Modal title="Invoice Details" open={isModalOpen} onCancel={handleCancel} footer={null} width={800}>
        <div className="flex items-center justify-start">
          <Tag onClick={handleDownloadPDF} color="green" className="!center_div gap-x-2 !cursor-pointer">
            <IconHelper.DOWNLOAD_ICON /> Download Invoice
          </Tag>
        </div>
        <div className="w-full lg:flex center_div overflow-scroll justify-start items-start font-medium">
          <div className="w-full mx-auto px-4 pb-4 !font-billfont" id="invoice">
            <div className="w-full center_div lg:flex-row flex-col lg:justify-between justify-center">
              <h1 className="font-bold lg:text-2xl lg:text-left text-center">INVOICE: #{_.get(trackinvoice, "invoice_id", "")}</h1>
              <div className="!text-sm flex flex-col gap-y-2 py-4 items-end">
                <img src={ImageHelper.Logo} alt="" className="!w-[180px]" />
                <span className="text-black lg:text-end">
                  #3 , xyz, <br />
                  xyz, <br />
                  xyz, <br /> xyz 09876
                </span>
                <span className="text-black">0987654321, 1234567890</span>
                <span className="text-black">info@mogo.in</span>
              </div>
            </div>

            <div className="center_div w-full lg:flex-row flex-col gap-y-3 justify-between lg:items-start pt-5">
              <div className="!text-sm flex flex-col gap-y-2 items-start">
                <h1 className="font-bold text-lg">
                  Date: <span className="text-black font-normal">{moment(_.get(trackinvoice, "order_date", "")).format("DD-MMM-yyyy")}</span>
                </h1>
                <h1 className="font-bold text-lg">
                  Payment: <span className="text-black font-normal">{_.get(trackinvoice, "paymentType", "")}</span>
                </h1>
                {_.get(trackinvoice, "payment_id", "") && (
                  <h1 className="font-bold text-lg">
                    Payment ID: <span className="text-black font-normal">{_.get(trackinvoice, "payment_id", "")}</span>
                  </h1>
                )}
              </div>
              <div className="!text-sm flex flex-col gap-y-2 lg:items-end">
                <h1 className="font-bold text-black text-lg">Billing Address</h1>
                <span className="text-black">{_.get(trackinvoice, "delivery_address.[0].address_name", "")} Address,</span>
                <span className="text-black">{_.get(trackinvoice, "delivery_address.[0].full_name", "")},</span>
                <span className="text-black">
                  {_.get(trackinvoice, "delivery_address.[0].phone_number", "")}, {_.get(trackinvoice, "delivery_address.[0].alternate_phone_number", "")}
                </span>
                <span className="text-black">
                  {_.get(trackinvoice, "delivery_address.[0].address", "")}, {_.get(trackinvoice, "delivery_address.[0].district", "")},{_.get(trackinvoice, "delivery_address.[0].pincode", "")}
                </span>
              </div>
            </div>

            <h1 className="pt-4 text-2xl font-bold !pb-6">Order Summary</h1>
            <table className="border-collapse border border-gray-200 w-full !text-black">
              <thead>
                <tr>
                  {orderItemsColumns.map(
                    (res, index) =>
                      res.value && (
                        <th key={index} className="border border-gray-200 !h-[50px]">
                          {res.title}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {orderItemsColumns.map(
                    (res, index) =>
                      res.value && (
                        <th key={index} className={`border border-gray-200 !h-[50px] px-4 ${res.title === "Total" ? "text-end" : ""}`}>
                          {res.value}
                        </th>
                      )
                  )}
                </tr>
              </tbody>
              <tbody>
                {subTotalColumns.map((res, index) => (
                  <tr key={index}>
                    <th colSpan={!_.isEmpty(_.get(trackinvoice, "cart_items.product_variants[0]", {})) ? 4 : 4} className="border border-gray-200 !h-[50px] text-end px-4">
                      {res.title}
                    </th>
                    <td className="border border-gray-200 !h-[50px] px-4 text-end">{res.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full center_div justify-end flex-col items-end py-6">
              <h1 className="text-2xl">Total Amount</h1>
              <h1 className="text-2xl text-primary">₹{_.get(trackinvoice, "product_details.product_finalTotal", "")}</h1>
              <h1 className="text-lg">Tax Included</h1>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Myorders;
