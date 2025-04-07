import React, { memo } from "react";
import { Tag } from "antd";
import { useHref } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import _ from "lodash";

const DashboardHeader = (properties) => {
  const {
    name,
    Icon,
    open,
    setOpen,
    vendorShown,
    adminShown,
    cancel,
    handleCancel,
  } = properties;

  const location = useHref();

  const role = useSelector((data) => data);

  const checkVisibility = (data) => {
    if (_.get(role, "role.currentRole.role", "") === "admin") {
      return adminShown;
    } else {
      return vendorShown;
    }
  };

  return (
    <div className="w-full h-[50px] bg-white px-4 center_div justify-between rounded font-Roboto gap-x-2">
      <div className="center_div gap-x-2">
        {<Icon className="!text-primary" />}
        <div className="text-xl">{name}</div>
      </div>
      {checkVisibility() ? (
        <Tag
          onClick={() => {
            setOpen(true);
          }}
          className={`bg-secondary text-white font-Roboto  rounded cursor-pointer ${
            !open ? "visible" : "invisible"
          } w-fit h-fit`}
        >
          +&nbsp;Add {name}
        </Tag>
      ) : (
        ""
      )}
      {cancel && (
        <Tag
          onClick={() => {
            handleCancel();
          }}
          className={`bg-primary text-white font-Roboto  rounded cursor-pointer ${
            open ? "block" : "hidden"
          } w-fit h-fit`}
        >
          Cancel
        </Tag>
      )}
    </div>
  );
};

export default memo(DashboardHeader);
