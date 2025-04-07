import React from "react";
import { IconHelper } from "../helper/IconHelper";
import { Avatar, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { changeRole } from "../redux/roleSlice";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GiOpenGate } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";

const TopNavbar = () => {
  const role = useSelector((data) => data);
  const dispatch = useDispatch();

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-x-2">
          <FaRegUser />
          <h1>{_.get(role, "role.currentRole.email", "")}</h1>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/dashboard/update_profile"}>
          <div className="flex items-center gap-x-2">
            <IconHelper.profileIcon />
            <h1>Update Profile</h1>
          </div>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="flex items-center gap-x-2 text-red-500"
          onClick={() => {
            localStorage.clear();
            dispatch(changeRole({ currentRole: [] }));
          }}
        >
          <AiOutlineLogout />
          <h1>logout</h1>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between w-full h-full px-4 !z-50  top-0">
      <IconHelper.menuOpenIcon className="invisible" />
      <div className="flex items-center gap-x-4">
        <Dropdown menu={{ items }} placement="topRight">
          <Avatar
            size={"small"}
            className="cursor-pointer !uppercase !text-[12px] bg-primary !text-white !font-Poppins"
          >
            {_.get(role, "role.currentRole.email", "").split("")[0]}
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNavbar;
