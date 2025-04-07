import { useEffect, useState } from "react";
import { ErrorNotification } from "../../../../helper/notification_helper";
import { getMyProducts } from "../../../../helper/api_helper";
import { Input, Table } from "antd";
import _ from "lodash";

const subColumns = [
  {
    title: "S.No",
    render: (data, all_value, index) => {
      return <div className="!font-Poppins">{index + 1}</div>;
    },
  },
  {
    title: "Size",
    dataIndex: "stock_variant_size",
    render: (data) => {
      return (
        <div
          className={`w-[25px] h-[25px] center_div text-[10px] font-bold rounded-lg border-white border-2 shadow-inner`}
        >
          {data}
        </div>
      );
    },
  },
  {
    title: "Color",
    dataIndex: "product_variant_color",
    render: (data) => {
      return (
        <div
          style={{
            backgroundColor: data,
          }}
          className={`w-[25px] h-[25px] rounded-lg border-white border-2 shadow-inner`}
        ></div>
      );
    },
  },
  {
    title: "MRP Price",
    dataIndex: "vendor_mrp_price",
    render: (data) => {
      return <div> ₹&nbsp;{data}</div>;
    },
  },

  {
    title: "Selling Price",
    dataIndex: "vendor_selling_price",
    render: (data) => {
      return <div> ₹&nbsp;{data}</div>;
    },
  },
  {
    title: "Stock Status",
    dataIndex: "stock_status",
    render: (data, all) => {
      return (
        <div
          className={`!text-[11x] capitalize ${
            data === "IN-STOCK" ? "text-green-500" : "text-slate-400"
          }   `}
        >
          {data}&nbsp;({_.get(all, "stock_count", "")})
        </div>
      );
    },
  },
  {
    title: "Active Status",
    dataIndex: "product_active_status",
    render: (data) => {
      return (
        <div
          className={`!text-[11x] capitalize ${
            data ? "text-green-500" : "text-slate-400"
          }   `}
        >
          {data ? "Active" : "In-active"}
        </div>
      );
    },
  },
  {
    title: "MOGO MRP Price",
    dataIndex: "mogo_mrp_price",
    render: (data) => {
      return <div> ₹&nbsp;{data}</div>;
    },
  },

  {
    title: "MOGO Selling Price",
    dataIndex: "mogo_selling_price",
    render: (data) => {
      return <div> ₹&nbsp;{data}</div>;
    },
  },
];

const AllProducts = (properties) => {
  const { columns, dummy, role } = properties;
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const fetchMyproducts = async () => {
    try {
      setLoading(true);

      const result = await getMyProducts(search || "all");
      setMyProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyproducts();
  }, [dummy, search]);

  return (
    <>
      <div className="w-full ">
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="antd_input2 shadow-inner border-gray-300"
          placeholder="Search"
        />
      </div>
      <Table
        size="small"
        loading={loading}
        rowKey={(data) => {
          return data._id;
        }}
        columns={
          role != "admin"
            ? columns.filter((res) => {
                return !["Requested Time"].includes(res.title);
              })
            : columns.filter((res) => {
                return !["Requested Time", "Delete", "Edit"].includes(
                  res.title
                );
              })
        }
        expandable={{
          expandedRowRender: (record) => (
            // console.log(_.get(record, "product_variants", [])),

            <Table
              className="pt-5"
              dataSource={_.get(record, "product_variants", [])}
              key={(data) => {
                return _.get(data, "_id", "");
              }}
              expandable={true}
              columns={
                role == "admin"
                  ? subColumns
                  : subColumns.filter((res) => {
                      return !["MOGO MRP Price", "MOGO Selling Price"].includes(
                        res.title
                      );
                    })
              }
              size="small"
            />

            // <div
            //   className="flex items-center
            // flex-col gap-y-3"
            // >
            //   {_.get(record, "product_variants", []).map((res, index) => {
            //     return (
            //       <tr key={index} className="w-full flex items-center gap-x-2">
            //         <td
            //           className={`w-[25px] h-[25px] center_div text-[10px] font-bold rounded-lg border-white border-2 shadow-inner`}
            //         >
            //           {_.get(res, "stock_variant_size", "")}
            //         </td>

            //       </tr>
            //     );
            //   })}
            // </div>
          ),
          rowExpandable: (record) => {
            // setExpandId(record._id === expandId ? "h" : record._id);
            return record._id != "id";
          },
        }}
        dataSource={myProducts}
      />
    </>
  );
};

export default AllProducts;
