import { Button, Form, Input, Select } from "antd";
import { requiredRules } from "../../../../helper/form_validation";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { MdDoubleArrow } from "react-icons/md";
import { v4 as uuid4 } from "uuid";

// eslint-disable-next-line react/prop-types
const ProductVariantInfo = ({ role }) => {
  return (
    <div className="!w-full flex items-center ">
      <Form.List name="product_variants" className="!relative">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-y-2 w-full">
            <Form.Item className="w-full flex items-center justify-end">
              <Button
                type="dashed"
                onClick={() => add()}
                block
                className="!bg-secondary !text-white !h-[30px]"
                icon={<PlusOutlined />}
              >
                Add Variant
              </Button>
            </Form.Item>
            <div className="flex flex-col gap-y-2">
              {fields.map(({ name, ...restField }, index) => (
                <div
                  key={index}
                  className="flex items-start  flex-wrap  gap-y-4 gap-x-2 product_boxes flex-col !relative"
                >
                  <div className="flex text-secondary justify-start gap-x-5 font-bold">
                    <div className="center_div gap-x-1">
                      <MdDoubleArrow className="icon" /> Product Variant
                      {index + 1}
                    </div>
                    {role != "admin" && (
                      <DeleteFilled
                        className="cursor-pointer text-primary"
                        onClick={() => remove(name)}
                      />
                    )}
                  </div>
                  <div className="w-full flex flex-wrap gap-x-10 gap-y-10">
                    <Form.Item
                      label="Variant Id"
                      rules={[requiredRules("Enter Product variant id")]}
                      className="!w-[200px] hidden"
                      {...restField}
                      name={[name, "varient_unique_id"]}
                      initialValue={uuid4()?.split("-").join("")}
                    >
                      <Input
                        disabled={true}
                        className="antd_input2 w-[200px]"
                        placeholder="Product variant id"
                      />
                    </Form.Item>
                    {/* mogo mrp and selling */}
                    {role === "admin" ? (
                      <>
                        <Form.Item
                          label="Mogo MRP Price"
                          rules={[requiredRules("Enter Product MRP Price")]}
                          className="!w-[200px] "
                          {...restField}
                          name={[name, "mogo_mrp_price"]}
                          initialValue={null}
                        >
                          <Input
                            type="number"
                            className="antd_input2 w-[200px]"
                            placeholder="Product Original Price"
                          />
                        </Form.Item>
                        <Form.Item
                          initialValue={null}
                          label="Mogo Selling Price"
                          rules={[
                            requiredRules("please enter available quantity"),
                          ]}
                          {...restField}
                          name={[name, "mogo_selling_price"]}
                        >
                          <Input
                            type="number"
                            placeholder="Enter Selling Price"
                            className="antd_input2 !w-[200px]"
                          />
                        </Form.Item>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* vendor mrp selling */}
                    <Form.Item
                      label="MRP Price"
                      rules={[requiredRules("Enter Product MRP Price")]}
                      className="!w-[200px]"
                      {...restField}
                      name={[name, "vendor_mrp_price"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="number"
                        className="antd_input2 w-[200px]"
                        placeholder="Product Original Price"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Selling Price"
                      rules={[requiredRules("please enter available quantity")]}
                      {...restField}
                      name={[name, "vendor_selling_price"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="number"
                        placeholder="Enter Selling Price"
                        className="antd_input2 !w-[200px]"
                      />
                    </Form.Item>

                    {/* special mrp and selling */}
                    {/* <Form.Item
                      initialValue={0}
                      label="Special MRP Price"
                      rules={[requiredRules("Enter Product MRP Price")]}
                      className="!w-[200px] hidden"
                      {...restField}
                      name={[name, "special_mrp_price"]}
                    >
                      <Input
                        type="number"
                        className="antd_input2 w-[200px]"
                        placeholder="Product Original Price"
                      />
                    </Form.Item>
                    <Form.Item
                      initialValue={0}
                      label="Special Selling Price"
                      rules={[requiredRules("please enter available quantity")]}
                      {...restField}
                      name={[name, "special_selling_price"]}
                      className="hidden"
                    >
                      <Input
                        type="number"
                        placeholder="Enter Selling Price"
                        className="antd_input2 !w-[200px]"
                      />
                    </Form.Item> */}
                    <Form.Item
                      label="Available Quantity (stock)"
                      rules={[requiredRules("please enter available quantity")]}
                      {...restField}
                      name={[name, "stock_count"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="number"
                        placeholder="Enter Available Quantity"
                        className="antd_input2 !w-[200px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Select Stock Status"
                      rules={[requiredRules("please select result")]}
                      {...restField}
                      name={[name, "stock_status"]}
                    >
                      <Select
                        disabled={role === "admin" ? true : false}
                        className="!w-[200px] !antd_input2"
                        placeholder="Select Stock Status"
                      >
                        <Select.Option value="IN-STOCK">IN-STOCK</Select.Option>
                        <Select.Option value="OUT-OF-STOCK">
                          OUT-OF-STOCK
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Packing Quantity (ex : pack of 2)"
                      rules={[requiredRules("please enter available quantity")]}
                      {...restField}
                      name={[name, "selling_quantity"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="number"
                        placeholder="Enter Available Quantity"
                        className="antd_input2 !w-[200px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Product Active Status"
                      rules={[requiredRules("Enter Product Active Status")]}
                      className="!w-[200px]"
                      name={[name, "product_active_status"]}
                    >
                      <Select
                        disabled={role === "admin" ? true : false}
                        className="!w-[200px] !antd_input2"
                        placeholder="Select Stock Status"
                      >
                        <Select.Option value={true}>ACTIVE</Select.Option>
                        <Select.Option value={false}>IN-ACTIVE</Select.Option>
                      </Select>
                    </Form.Item>
                    {/* <Form.Item
                      label="Select Size"
                      rules={[requiredRules("please Product Size")]}
                      {...restField}
                      name={[name, "stock_variant_size"]}
                    >
                      <Select
                        disabled={role === "admin" ? true : false}
                        className="!w-[200px] !antd_input2"
                        placeholder="Select Product Size"
                      >
                        <Select.Option value="S">
                          <span className="font-bold">S</span>-
                          <span className="text-gray-400">small</span>
                        </Select.Option>
                        <Select.Option value="M">
                          <span className="font-bold">M</span>-
                          <span className="text-gray-400">medium</span>
                        </Select.Option>
                        <Select.Option value="L">
                          <span className="font-bold">L</span>-
                          <span className="text-gray-400">large</span>
                        </Select.Option>
                        <Select.Option value="XL">
                          <span className="font-bold">XL</span>-
                          <span className="text-gray-400">extra large</span>
                        </Select.Option>
                        <Select.Option value="XXl">
                          <span className="font-bold">XXl</span>-
                          <span className="text-gray-400">
                            extra extra large
                          </span>
                        </Select.Option>
                      </Select>
                    </Form.Item> */}
                    <Form.Item
                      label="Product Weight"
                      rules={[requiredRules("please enter product weight")]}
                      {...restField}
                      name={[name, "product_weight"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="number"
                        placeholder="Enter Product Weight"
                        className="antd_input2 !w-[200px]"
                        suffix="KG"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Color"
                      rules={[requiredRules("Enter Product Color")]}
                      className="!w-[100px]"
                      {...restField}
                      name={[name, "product_variant_color"]}
                    >
                      <Input
                        disabled={role === "admin" ? true : false}
                        type="Color"
                        className="antd_input2 w-[80px] hover:border-secondary  cursor-pointer  shadow-2xl"
                        placeholder="Product Original Price"
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default ProductVariantInfo;
