import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { getAllStores, getAllUsers } from "../../../helper/api_helper";
import { ErrorNotification } from "../../../helper/notification_helper";
import _ from "lodash";
import { Avatar, Image, Table } from "antd";

const User = () => {
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const result = await getAllUsers();

      setuserData(_.get(result, "data.data", []));
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
      dataIndex: "user_profile",
      render: (data, all) => {
        return (
          <div>
            {all.user_profile ? (
              <Image className="!w-[35px] !h-[35px] rounded-lg" src={data} />
            ) : (
              <Avatar
                style={{ background: all.profile_color }}
                className="!w-[35px] !h-[35px] !rounded-lg"
              >
                {all.user_name?.split("")[0]?.toUpperCase()}
              </Avatar>
            )}
          </div>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "user_name",
    },
    {
      title: "Phone Number",
      dataIndex: "user_mobile",
    },
    {
      title: "Email",
      dataIndex: "user_email",
    },
  ];

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader
        name="Users"
        Icon={IconHelper.customerIcon}
        vendorShown={false}
      />
      <div className="w-full h-fit bg-white">
        <Table
          loading={loading}
          dataSource={userData}
          columns={columns}
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          className="!shadow-inner"
        />
      </div>
    </div>
  );
};

export default User;
