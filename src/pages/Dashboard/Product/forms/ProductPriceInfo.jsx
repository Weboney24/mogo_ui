import { Form, Input, Switch } from "antd";
import React from "react";
import { requiredRules } from "../../../../helper/form_validation";

const ProductPriceInfo = (properties) => {
  const { handleVendorSellingPriceChange } = properties;
  return (
    <div className="!w-full flex items-center gap-x-2">
      <Form.Item
        label="Product MRP Price"
        name="product_original_price"
        rules={[requiredRules("Enter Product MRP Price")]}
        className="!w-[300px]"
      >
        <Input
          onChange={() => {
            handleVendorSellingPriceChange("mrp");
          }}
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Original Price"
        />
      </Form.Item>

      <Form.Item
        label="Product Selling Price"
        name="product_selling_price"
        className="!w-[300px]"
        rules={[requiredRules("Enter Product Selling Price")]}
      >
        <Input
          onChange={handleVendorSellingPriceChange}
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Price"
        />
      </Form.Item>
      <Form.Item
        label="Product Discount %"
        name="product_discount"
        className="!w-[300px]"
      >
        <Input
          disabled
          min={0}
          max={90}
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Discount %"
          suffix="%"
        />
      </Form.Item>
      <Form.Item
        label="Product Packing Quantity (ex : pack of 2)"
        name="product_sell_quantity"
        rules={[requiredRules("Enter Product  Packing Quantity ")]}
        className="!w-[300px]"
      >
        <Input
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product  Packing Quantity "
        />
      </Form.Item>
    </div>
  );
};

export default ProductPriceInfo;
