/* eslint-disable react/prop-types */
import { DeleteOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import _ from "lodash";
import React from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { ImHome3 } from "react-icons/im";

const DeliveryAddress = ({ res, size, solo, edit, handleDelete }) => {
  return (
    <div className="relative">
      <Tag
        className={` ${
          size ? "w-full lg:w-[300px]" : "w-full lg:w-[400px]"
        }  mt-4 bg-white cursor-pointer border-secondary border  min-h-[100px] shadow-md p-4 flex flex-col gap-y-1 rounded-lg `}
      >
        {(solo
          ? _.get(res, "address_name", "")
          : _.get(res, "[0].address_name", "")) != "office" ? (
          <div className="flex items-center gap-x-2 font-Poppins">
            <ImHome3 /> <div>Home Address</div>
          </div>
        ) : (
          <div className="flex items-center gap-x-2 font-Poppins">
            <HiMiniBuildingOffice2 /> <div>Office Address</div>
          </div>
        )}
        <h1 className="font-Poppins">
          {solo ? _.get(res, "full_name", "") : _.get(res, "[0].full_name", "")}
        </h1>
        <address>
          <h1 className="tracking-wider">
            {solo
              ? _.get(res, "phone_number", "")
              : _.get(res, "[0].phone_number", "")}
            , &nbsp;
            {solo
              ? _.get(res, "alternate_phone_number", "")
              : _.get(res, "[0].alternate_phone_number", "")}
          </h1>

          <address className="overflow-clip text-ellipsis">
            {solo ? _.get(res, "address", "") : _.get(res, "[0].address", "")}
          </address>
          <h1>
            {solo ? _.get(res, "district", "") : _.get(res, "[0].district", "")}
            , &nbsp;
            {solo ? _.get(res, "pincode", "") : _.get(res, "[0].pincode", "")}
          </h1>
        </address>
      </Tag>
      {edit && (
        <div className="absolute right-10  top-10">
          <DeleteOutlined
            onClick={() => {
              handleDelete(_.get(res, "_id", ""));
            }}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
