/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Spin, Timeline } from "antd";
import { useEffect, useState } from "react";
import { trackMyOrder } from "../../../helper/api_helper";
import _ from "lodash";
import moment from "moment";
import DeliveryAddress from "../../Checkout/DeliveryAddress";

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
      let filterStatus = orderDetails.filter((res) => {
        return res.order_status === pick;
      });
      if (!_.isEmpty(filterStatus)) {
        return {
          date: moment(_.get(filterStatus, "[0].createdAt", "")).format(
            "MMM Do YY"
          ),
          time: moment(_.get(filterStatus, "[0].createdAt", "")).format(
            "hh:MM A"
          ),
          status: true,
        };
      } else {
        return {
          date: "",
          time: "",
          status: false,
        };
      }
    } catch (err) {}
  };

  let statusItem = [
    {
      id: 1,
      name: "Order Placed",
      subText: "we have received your order",
      date: getTime("confirmed").date,
      time: getTime("confirmed").time,
      status: getTime("confirmed").status,
    },
    {
      id: 2,
      name: "Item Packed",
      subText: "Seller has processed your Order",
      date: getTime("Item Packed").date,
      time: getTime("Item Packed").time,
      status: getTime("Item Packed").status,
    },
    {
      id: 3,
      name: "Shipped",
      subText: "your item has been picked up by courier partner",
      date: getTime("Item Picked Up By Delivery Partner").date,
      time: getTime("Item Picked Up By Delivery Partner").time,
      status: getTime("Item Picked Up By Delivery Partner").status,
    },
    {
      id: 4,
      name: "Out For Delivery",
      subText: "your item is out for delivery",
      date: getTime("Out For Delivery").date,
      time: getTime("Out For Delivery").time,
      status: getTime("Out For Delivery").status,
    },
    {
      id: 5,
      name: "Delivered",
      subText: "your item has been delivered",
      date: getTime("Delivered").date,
      time: getTime("Delivered").time,
      status: getTime("Delivered").status,
    },
  ];

  return (
    <Spin spinning={loading}>
      <Timeline
        items={statusItem.map((res, index) => {
          return {
            color: res.status ? "green" : "gray",
            children: (
              <div className="flex flex-col gap-y-1">
                <h1
                  className={`font-Poppins ${
                    res.status ? "text-secondary" : "text-gray-400"
                  } `}
                >
                  {res.name}
                </h1>
                <p className="text-[14px]">{res.subText}</p>
                <p
                  className={`text-[12px] ${
                    res.status ? "visible" : "invisible"
                  }`}
                >
                  {res.date} &nbsp; {res.time}
                </p>
              </div>
            ),
          };
        })}
      />
      <div className="w-[50%]">
        <h1 className="font-Poppins">Delivery Address</h1>
        <DeliveryAddress
          res={_.get(order_id, "delivery_address", [])}
          size={200}
        />
      </div>
    </Spin>
  );
};

export default TrackOrder;
