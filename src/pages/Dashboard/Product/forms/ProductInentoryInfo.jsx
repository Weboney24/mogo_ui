import { Form, Input, Select } from "antd";
import { requiredRules } from "../../../../helper/form_validation";

const ProductInentoryInfo = () => {
  return (
    <div className="!w-full flex items-center gap-x-2">
      <Form.Item
        label="Available Quantity (stock)"
        name="product_quantity"
        rules={[requiredRules("Enter Product Quantity")]}
        className="!w-[300px]"
      >
        <Input
          type="number"
          className="antd_input2 w-[300px]"
          placeholder="Product Quantity"
        />
      </Form.Item>
      <Form.Item
        label="Select Product Stock Status"
        name="product_in_stock"
        rules={[requiredRules("Select Product Stock")]}
        className="!w-[300px]"
      >
        <Select
          className="!w-[300px] !antd_input2"
          placeholder="Select Stock Status"
        >
          <Select.Option value={true}>IN-STOCK</Select.Option>
          <Select.Option value={false}>OUT-OF-STOCK</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Product Active Status"
        name="product_active_status"
        rules={[requiredRules("Enter Product Active Status")]}
        className="!w-[300px]"
      >
        <Select
          className="!w-[300px] !antd_input2"
          placeholder="Select Stock Status"
        >
          <Select.Option value={true}>ACTIVE</Select.Option>
          <Select.Option value={false}>IN-ACTIVE</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default ProductInentoryInfo;
