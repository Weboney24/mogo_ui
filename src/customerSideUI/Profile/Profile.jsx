import { Tabs } from "antd";

import { useSelector } from "react-redux";

import MyProfile from "./Screens/MyProfile";
import Myorders from "./Screens/Myorders";
import MyDeliveryAddress from "./Screens/MyDeliveryAddress";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import BulkPurchase from "./Screens/BulkPurchase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userData = useSelector((data) => data);

  const navigate = useNavigate();

  const LuCheckCheck = () => {
    if (!localStorage.getItem("customers_token")) {
      navigate("/");
    }
  };

  useEffect(() => {
    LuCheckCheck();
  }, []);

  const location = useLocation();

  const items = [
    {
      key: "1",
      label: "Profile",
      children: <MyProfile userData={userData} />,
    },
    {
      key: "2",
      label: "My Orders",
      children: <Myorders />,
    },
    {
      key: "3",
      label: "My Delivery Address",
      children: <MyDeliveryAddress />,
    },
    {
      key: "4",
      label: "Bulk Purchase Request",
      children: <BulkPurchase />,
    },
  ];

  return (
    <div className="flex px-4 md:px-8 lg:px-16 py-10 w-full min-h-screen">
      <div className="w-full h-full">
        <Tabs
          forceRender={true}
          destroyInactiveTabPane
          size="large"
          tabPosition={"top"}
          items={items}
          defaultActiveKey={`${location?.search?.split("?")[1]}`}
        />
      </div>
    </div>
  );
};

export default Profile;
