import { Button, Form, Input, Select, Space, Switch, Upload } from "antd";
import React from "react";

import {
  DeleteFilled,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const SizeVariants = () => {
  return (
    <div className="!w-full flex items-center ">
      <Form.List name="product_variants_size" className="!relative">
        {(fields, { add, remove }) => (
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-end ">
              <Button
                type="dashed"
                onClick={() => add()}
                block
                className="!bg-secondary !text-white !w-fit !h-[30px]"
                icon={<PlusOutlined />}
              >
                Add Sizes
              </Button>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              {fields.map(({ key, name, ...restField }) => (
                <div className="">
                  <Form.Item
                    {...restField}
                    label={key}
                    name={[name, "sizes"]}
                    className="!w-[300px]"
                    //   rules={[requiredRules("Upload Product Images")]}
                  >
                    <Select>
                      <Select.Option value="XL">XL</Select.Option>
                      <Select.Option value="S">S</Select.Option>
                      <Select.Option value="M">M</Select.Option>
                      <Select.Option value="L">L</Select.Option>
                      <Select.Option value="XS">XS</Select.Option>
                      <Select.Option value="XXL">XXL</Select.Option>
                      <Select.Option value="2XL">2XL</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default SizeVariants;
