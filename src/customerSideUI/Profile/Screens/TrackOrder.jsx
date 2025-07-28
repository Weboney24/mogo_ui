/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { message, Spin, Timeline } from "antd";
import { useEffect, useState } from "react";
import { cancelOrderApi, trackMyOrder } from "../../../helper/api_helper";
import _ from "lodash";
import moment from "moment";
import DeliveryAddress from "../../Checkout/DeliveryAddress";
import CancelOrderButton from "./CancelOrderButton";
import { ErrorNotification, SuccessNotification } from "../../../helper/notification_helper";

const TrackOrder = ({ order_id }) => {
  const [orderDetails, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await trackMyOrder(_.get(order_id, "invoice_id", ""));
      setDetails(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [order_id]);

  const getTime = (pick) => {
    try {
      let filterStatus = orderDetails.filter(
        (res) => res.order_status === pick
      );
      if (!_.isEmpty(filterStatus)) {
        return {
          date: moment(_.get(filterStatus, "[0].createdAt", "")).format("MMM Do YY"),
          time: moment(_.get(filterStatus, "[0].createdAt", "")).format("hh:mm A"),
          status: true,
        };
      } else {
        return {
          date: "",
          time: "",
          status: false,
        };
      }
    } catch (err) {
      return { date: "", time: "", status: false };
    }
  };

  const isCancelled = getTime("Cancelled").status;
  const isDelivered = getTime("Delivered").status;

  // All full steps
  const fullStatusItem = [
    {
      id: 1,
      name: "Order Placed",
      subText: "We have received your order",
      ...getTime("confirmed"),
    },
    {
      id: 2,
      name: "Item Packed",
      subText: "Seller has processed your order",
      ...getTime("Item Packed"),
    },
    {
      id: 3,
      name: "Shipped",
      subText: "Your item has been picked up by courier partner",
      ...getTime("Item Picked Up By Delivery Partner"),
    },
    {
      id: 4,
      name: "Out For Delivery",
      subText: "Your item is out for delivery",
      ...getTime("Out For Delivery"),
    },
    {
      id: 5,
      name: "Delivered",
      subText: "Your item has been delivered",
      ...getTime("Delivered"),
    },
  ];

  // Filter timeline if cancelled
  let statusItem = [];
  if (isCancelled) {
    const lastCompletedIndex = fullStatusItem.findIndex((item) => !item.status);
    const cutIndex = lastCompletedIndex === -1 ? fullStatusItem.length : lastCompletedIndex;
    statusItem = fullStatusItem.slice(0, cutIndex);
    statusItem.push({
      id: 6,
      name: "Cancelled",
      subText: "Your order has been cancelled",
      ...getTime("Cancelled"),
    });
  } else {
    statusItem = fullStatusItem;
  }

  const cancelOrder = async () => {
    try {
      setLoading(true);
      const result = await cancelOrderApi(_.get(order_id, "invoice_id", ""));
      SuccessNotification(result);
      fetchData();
    } catch (error) {
      ErrorNotification(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Timeline
        items={statusItem.map((res) => ({
          color: res.status ? (res.name === "Cancelled" ? "red" : "green") : "gray",
          children: (
            <div className="flex flex-col gap-y-1">
              <h1 className={`font-Poppins ${res.status ? (res.name === "Cancelled" ? "text-red-500" : "text-secondary") : "text-gray-400"}`}>
                {res.name}
              </h1>
              <p className="text-[14px]">{res.subText}</p>
              <p className={`text-[12px] ${res.status ? "visible" : "invisible"}`}>
                {res.date} &nbsp; {res.time}
              </p>
            </div>
          ),
        }))}
      />

      <div className="w-[50%]">
        <h1 className="font-Poppins">Delivery Address</h1>
        <DeliveryAddress
          res={_.get(order_id, "delivery_address", [])}
          size={200}
        />
      </div>

      {!isCancelled && !isDelivered && (
        <div className="mt-2">
          <CancelOrderButton onConfirm={cancelOrder} />
        </div>
      )}
    </Spin>
  );
};

export default TrackOrder;
