/* eslint-disable react/prop-types */
import React from "react";

const IncreamentBox = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center">
      <div
        onClick={() => {
          quantity != 1 && setQuantity(quantity - 1);
        }}
        className={`size-[38px] ${quantity===1?"bg-gray-100 cursor-no-drop":""} border center_div cursor-pointer hover:bg-red-500 hover:text-white`}
      >
        -
      </div>
      <div className="size-[38px] border center_div">{quantity}</div>
      <div
        onClick={() => {
          setQuantity(quantity + 1);
        }}
        className="size-[38px] border center_div cursor-pointer hover:bg-secondary hover:text-white"
      >
        +
      </div>
    </div>
  );
};

export default IncreamentBox;
