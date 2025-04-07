import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../../../helper/notification_helper";
import {
  getMyActiveStockProducts,
  getMyProducts,
} from "../../../../helper/api_helper";
import { Image, Select, Table } from "antd";
import _ from "lodash";
import moment from "moment";

const ActiveProducts = (properties) => {
  const { columns ,dummy} = properties;
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");

  const fetchMyproducts = async () => {
    try {
      setLoading(true);
      let formData = {
        filter: filter || "all",
      };
      const result = await getMyActiveStockProducts(JSON.stringify(formData));
      setMyProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyproducts();
  }, [filter,dummy]);

  return (
    <div className="bg-white p-4">
      <div className="bg-white w-full h-[50px] flex justify-end">
        <Select
          className="!antd_input !w-[300px] !h-[40px] !shadow-inner"
          placeholder="Filter By Product Active Status"
          onChange={(e) => {
            setFilter(e || "all");
          }}
          allowClear
        >
          <Select.Option value={1}>Active</Select.Option>
          <Select.Option value={2}>In-Active</Select.Option>
        </Select>
      </div>
      <Table
        loading={loading}
        columns={columns.filter((res) => {
          return !["Stock Status", "Request", "Requested Time"].includes(
            res.title
          );
        })}
        dataSource={myProducts}
      />
    </div>
  );
};

export default ActiveProducts;
