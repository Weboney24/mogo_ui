import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { getAllStores } from "../../../helper/api_helper";
import { ErrorNotification } from "../../../helper/notification_helper";
import _ from "lodash";
import { Image, Table } from "antd";

const Store = () => {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const result = await getAllStores();

      setStoreData(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []);

  const columns = [
    {
      title: "S.No",
      align: "center",
      render: (data, allData, index) => {
        return <h1 className="font-bold">{index + 1}</h1>;
      },
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (data) => {
        return (
          <div>
            {data ? (
              ""
            ) : (
              <Image
                className="!w-[50px] !h-[50px]"
                src="https://static.vecteezy.com/system/resources/previews/006/398/494/non_2x/illustration-of-store-or-market-flat-design-vector.jpg"
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Store Name",
      dataIndex: "company_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "GSTN",
      dataIndex: "GSTN",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (data) => {
        return <div className="line-clamp-3 w-[200px]">{data}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Stores"
        Icon={IconHelper.storeIcon}
        vendorShown={false}
      />
      <div className="w-full h-fit bg-white">
        <Table
          loading={loading}
          dataSource={storeData}
          columns={columns}
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          className="!shadow-inner"
        />
      </div>
    </div>
  );
};

export default Store;
