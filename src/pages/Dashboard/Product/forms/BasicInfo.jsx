import { Form, Input, Switch } from "antd";
import React from "react";

import CategoryInfo from "./CategoryInfo";
import { requiredRules } from "../../../../helper/form_validation";

const BasicInfo = (properties) => {
  const {
    category,
    filterSubCategory,
    filterProductCategory,
    handleCategoryChange,
    handleSubcategoryChange,
    role,
  } = properties;
  return (
    <div className="flex items-start flex-wrap gap-4 justify-start !w-full">
      <Form.Item
        label="Product Name"
        name="product_name"
        rules={[requiredRules("Enter Product Name")]}
        className="!w-[49%]"
      >
        <Input
          disabled={role === "admin" ? true : false}
          className="antd_input2 w-full"
          placeholder="Product Name"
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Product Keywords
            <span className="!text-sm !font text-gray-400">
              (Add a comma between words. Example: product, computer)
            </span>
          </span>
        }
        name="product_keywords"
        rules={[requiredRules("Enter Product Keywords")]}
        className="!w-[49%]"
      >
        <Input
          disabled={role === "admin" ? true : false}
          className="antd_input2 w-full"
          placeholder="Product Keyword"
        />
      </Form.Item>
      {/* description */}
      <Form.Item
        label="Product Descriptions"
        name="product_descriptions"
        className="!w-full"
        rules={[requiredRules("Enter Product Descriptions")]}
      >
        <Input.TextArea
          disabled={role === "admin" ? true : false}
          rows={4}
          className="!w-full"
        />
      </Form.Item>
      {/* <Form.Item
        label={<span>Product Stock</span>}
        name="product_quantity"
        rules={[requiredRules("Enter Product Quantity")]}
      >
        <Input
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Quantity"
        />
      </Form.Item>
      <Form.Item
        label="Product Price"
        name="product_price"
        rules={[requiredRules("Enter Product Price")]}
      >
        <Input
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Price"
        />
      </Form.Item>
      <Form.Item
        label="Product Stock Status"
        name="product_stock_status"
        className="w-full"
        rules={[requiredRules("Enter Product Stock Status")]}
      >
        <Switch defaultChecked={true} size="small"/>
      </Form.Item> */}
    </div>
  );
};

export default BasicInfo;
