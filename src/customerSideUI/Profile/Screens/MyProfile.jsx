/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import AvatarBox from "../../Layout/AvatarBox";
import _ from "lodash";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notificationCount } from "../../../redux/notificationslice";
import { cardCount } from "../../../redux/cartSlice";
import { ListCount } from "../../../redux/favSlice";

const MyProfile = ({ userData }) => {
  const navigate = useNavigate();

  console.log();

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.removeItem("customers_token");

      dispatch(
        notificationCount({
          count: !_.get(userData, ".notification_slice.value.count", ""),
        })
      );
      dispatch(
        cardCount({ count: 0 })
      );
      dispatch(
        ListCount({ count: 0 })
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="flex w-full min-h-[70vh]">
      <div className="w-[100%]  h-[400px]  center_div items-center pt-10 justify-start  rounded-lg  flex-col relative">
        <AvatarBox width={100} height={100} size={50} />
        <h1 className="pt-4 font-Poppins line-clamp-1">
          {_.get(userData, "product.value.name", "")}
        </h1>
        <h1>{_.get(userData, "product.value.email", "")}</h1>
        {/* <div className="w-[30%] pt-10 center_div text-sm font-bold  cursor-pointer text-secondary border-gray-100 ">
          <EditOutlined /> &nbsp; Edit Profile
        </div> */}
        <div
          onClick={() => {
            handleLogout();
          }}
          className="w-[30%] pt-10 center_div text-sm font-bold  cursor-pointer text-red-500 border-gray-100 "
        >
          <LogoutOutlined /> &nbsp; Logout
        </div>
      </div>
      
    </div>
  );
};

export default MyProfile;
