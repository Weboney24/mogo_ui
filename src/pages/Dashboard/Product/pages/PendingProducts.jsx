import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../../../helper/notification_helper";
import {
  getMyPendingProducts,
  getMyProducts,
} from "../../../../helper/api_helper";
import { Image, Table } from "antd";
import _ from "lodash";
import moment from "moment";

const PendingProducts = (properties) => {
  const { columns, dummy } = properties;
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyproducts = async () => {
    try {
      setLoading(true);
      const result = await getMyPendingProducts();
      setMyProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyproducts();
  }, [dummy]);

  return (
    <Table
      loading={loading}
      columns={columns.filter((res) => {
        return !["Stock Status", "Active Status"].includes(res.title);
      })}
      dataSource={myProducts}
    />
  );
};

export default PendingProducts;
