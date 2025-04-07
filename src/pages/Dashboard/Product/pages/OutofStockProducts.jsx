import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../../../helper/notification_helper";
import {
  getMyOutofStockProducts,
  getMyProducts,
} from "../../../../helper/api_helper";
import { Image, Input, Select, Table } from "antd";
import _ from "lodash";
import moment from "moment";

const OutofStockProducts = (properties) => {
  const { columns, dummy } = properties;
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");

  const fetchMyproducts = async () => {
    try {
      setLoading(true);
      let formData = {
        filter: filter || "all",
      };
      const result = await getMyOutofStockProducts(JSON.stringify(formData));
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
          placeholder="Filter By Stock Status"
          onChange={(e) => {
            setFilter(e || "all");
          }}
          allowClear
        >
          <Select.Option value={1}>In-Stock</Select.Option>
          <Select.Option value={2}>Out-Of-Stock</Select.Option>
        </Select>
      </div>
      <Table
        loading={loading}
        columns={columns.filter((res) => {
          return !["Request", "Requested Time", "Active Status"].includes(
            res.title
          );
        })}
        dataSource={myProducts}
      />
    </div>
  );
};

export default OutofStockProducts;
