import React, { useEffect, useState } from "react";
import { IconHelper } from "../../../helper/IconHelper";
import { Card } from "antd";
import { fetchAllCounts } from "../../../helper/api_helper";
import { ErrorNotification } from "../../../helper/notification_helper";
import _ from "lodash";
import CountUp from "react-countup";

const Count = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchAllCounts();
      setdata(_.get(result, "data.data", []));
    } catch (e) {
      ErrorNotification(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  const item = [
    {
      id: 1,
      name: "Vendors",
      count: <CountUp duration={3} end={_.get(data, "vendorCount", "")} />,
      icon: IconHelper.storeIcon,
    },
    {
      id: 2,
      name: "Customers",
      count: <CountUp duration={3} end={_.get(data, "userCount", "")} />,
      icon: IconHelper.profileIcon,
    },
    {
      id: 4,
      name: "Products",
      count: <CountUp duration={3} end={_.get(data, "productCount", "")} />,
      icon: IconHelper.productIcon,
    },
    {
      id: 5,
      name: "Orders",
      count: <CountUp duration={3} end={_.get(data, "ordersCount", "")} />,
      icon: IconHelper.productIcon,
    },
  ];

  return (
    <>
      <div className="w-full min-h-[100px]">
        <div className="flex flex-wrap gap-2">
          {item.map((res, index) => {
            return (
              <Card
                hoverable
                loading={loading}
                key={index}
                className="!bg-white shadow-md !w-[267px]  rounded-lg !min-h-[100px] group relative font-Poppins "
              >
                <Card.Meta description={`Total ${res.name}`} />
                <h1 className="py-4 px-1 text-xl">{res.count}</h1>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Count;
