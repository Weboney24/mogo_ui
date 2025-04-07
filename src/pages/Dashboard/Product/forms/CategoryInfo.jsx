import React, { useEffect, useState } from "react";
import { getProductSubCategoryData } from "../../category/specialApi";
import { Form, Select } from "antd";
import _ from "lodash";
import { requiredRules } from "../../../../helper/form_validation";

const CategoryInfo = (properties) => {
  const {
    category,
    filterSubCategory,
    filterProductCategory,
    handleCategoryChange,
    handleSubcategoryChange,
    role,
    brand,
    fabric,
  } = properties;

  return (
    <div className="flex items-center gap-x-2 gap-y-4 flex-wrap">
      <Form.Item
        name="product_category_name"
        rules={[requiredRules("Select Category")]}
        label="Category"
      >
        <Select
          disabled={role === "admin" ? true : false}
          className="!w-[300px] antd_input2"
          placeholder="Select Category"
          onChange={handleCategoryChange}
        >
          {category.map((res, index) => {
            return (
              <Select.Option value={res._id} key={index}>
                {res.category_name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      {!_.isEmpty(filterSubCategory) && (
        <Form.Item name="product_sub_category_name" label="Sub Category">
          <Select
            disabled={role === "admin" ? true : false}
            onChange={handleSubcategoryChange}
            className="!w-[300px] antd_input2"
            placeholder="Select Sub Category"
          >
            {filterSubCategory.map((res, index) => {
              return (
                <Select.Option value={res._id} key={index}>
                  {res.sub_category_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {!_.isEmpty(filterProductCategory) && (
        <Form.Item
          name="product_product_category_name"
          label="Product Category"
        >
          <Select
            disabled={role === "admin" ? true : false}
            className="!w-[300px] antd_input2"
            placeholder="Select Product Category"
          >
            {filterProductCategory.map((res, index) => {
              return (
                <Select.Option value={res._id} key={index}>
                  {res.product_category_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {!_.isEmpty(brand) && (
        <Form.Item name="product_brand_id" label="Select Product Brand">
          <Select
            disabled={role === "admin" ? true : false}
            className="!w-[300px] antd_input2"
            placeholder="Select Product Brand"
          >
            {brand.map((res, index) => {
              return (
                <Select.Option value={res.brand_name} key={index}>
                  {res.brand_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
      {!_.isEmpty(fabric) && (
        <Form.Item name="product_fabric_id" label="Select Fabric Type">
          <Select
            disabled={role === "admin" ? true : false}
            className="!w-[300px] antd_input2"
            placeholder="Select Product Fabric Type"
          >
            {fabric.map((res, index) => {
              return (
                <Select.Option value={res.fabric_name} key={index}>
                  {res.fabric_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      )}
    </div>
  );
};

export default CategoryInfo;
