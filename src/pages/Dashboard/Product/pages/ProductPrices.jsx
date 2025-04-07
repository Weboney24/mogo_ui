import React, { useEffect, useState } from "react";

import {
  getMyActiveStockProducts,
  getMyProducts,
} from "../../../../helper/api_helper";
import { Image, Select, Table, Tag } from "antd";
import _ from "lodash";
import moment from "moment";
import { GrCircleInformation } from "react-icons/gr";
import { DeleteOutlined } from "@ant-design/icons";
import { ErrorNotification } from "../../../../helper/notification_helper";

const ProductPrices = (properties) => {
  const { dummy, currentRole, handleDelete } = properties;
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");

  const [filterColums, setFilterColums] = useState([]);

  const fetchMyproducts = async () => {
    try {
      setLoading(true);
      let formData = {
        filter: filter || "all",
      };
      const result = await getMyProducts();
      setMyProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyproducts();
  }, [filter, dummy]);

  useEffect(() => {
    if (currentRole === "admin") {
      setFilterColums(["Delete"]);
    } else {
      setFilterColums(["Mogo MRP", "Mogo Discount %", "Mogo Final Price"]);
    }
  }, [currentRole]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "_id",
      render: (data, all_value, index) => {
        return <div className="!font-Poppins">{index + 1}</div>;
      },
    },
    {
      title: "Images",
      dataIndex: "product_images",
      render: (data, all_value, index) => {
        let paths = data.map((res) => {
          return res[0];
        });
        return (
          <Image.PreviewGroup className="!w-[50px] !h-[50px]" items={paths}>
            <Image
              src={data[0]}
              className="!w-[50px] !h-[50px]"
              onClick={() => {
                handlePreview(data);
              }}
            />
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (data, all_value, index) => {
        return (
          <div className="capitalize w-[200px] !text-ellipsis !line-clamp-1">
            {data}
          </div>
        );
      },
    },

    {
      title: currentRole === "admin" ? "Vendor MRP" : "MRP",
      dataIndex: "product_original_price",
      render: (value) => {
        return <div>&#8377;&nbsp;{value}</div>;
      },
      align: "center",
    },
    {
      title: currentRole === "admin" ? "Vendor Discount %" : " Discount %",
      dataIndex: "product_discount",
      render: (value) => {
        return <Tag color="#33325e">{value}&nbsp;%</Tag>;
      },
      align: "center",
    },
    {
      title: currentRole === "admin" ? "Vendor Final Price" : "Final Price",
      dataIndex: "product_selling_price",
      render: (value) => {
        return <div className="text-secondary">&#8377;&nbsp;{value}</div>;
      },
      align: "center",
    },
    {
      title: "Mogo MRP",
      dataIndex: "mogo_mrp_price",
      render: (value) => {
        return <div>&#8377;&nbsp;{value}</div>;
      },
      align: "center",
    },
    {
      title: "Mogo Discount %",
      dataIndex: "mogo_discount_price",
      render: (value) => {
        return <Tag color="#33325e">{value}&nbsp;%</Tag>;
      },
      align: "center",
    },
    {
      title: "Mogo Final Price",
      dataIndex: "mogo_selling_price",
      render: (value) => {
        return <div className="text-secondary">&#8377;&nbsp;{value}</div>;
      },
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "_id",
      align: "center",
      render: (status) => {
        return (
          <DeleteOutlined
            onClick={() => {
              handleDelete(status);
            }}
            className="cursor-pointer text-pink-600"
          />
        );
      },
    },
  ];

  return (
    <div className="bg-white p-4">
      <Table
        loading={loading}
        columns={columns.filter((res) => {
          return !filterColums.includes(res.title);
        })}
        dataSource={myProducts}
      />
    </div>
  );
};

export default ProductPrices;
