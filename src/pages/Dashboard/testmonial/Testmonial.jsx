import { useState, useEffect } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { Button, Form, Input, Modal, Rate, Tooltip } from "antd";
import { requiredRules } from "../../../helper/form_validation";
import { ErrorNotification, SuccessNotification } from "../../../helper/notification_helper";
import { addTestmonial, deleteTestmonail, editTestmonail, getTestmonail } from "../../../helper/api_helper";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";

const Testmonial = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [testimonials, setTestimonials] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);

  const fetchData = async () => {
    try {
      const result = await getTestmonail();
      const data = _.get(result, "data", []);
      setTestimonials(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hanldeCancel = () => {
    setOpen(false);
    form.resetFields();
    setEditId(false);
    setCurrentRating(0);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const result = await deleteTestmonail(id);
      SuccessNotification(result);
      fetchData();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      let result;
      if (editId) {
        result = await editTestmonail(editId, { ...values, ratings: currentRating });
      } else {
        result = await addTestmonial({ ...values, ratings: currentRating });
      }
      SuccessNotification(result);
      hanldeCancel();
      fetchData();
    } catch (err) {
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard_header_div !font-Poppins">
        <DashboardHeader name="Testmonial" Icon={IconHelper.BannerIcon} vendorShown={false} adminShown={true} open={open} setOpen={setOpen} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-4">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.user}</h3>
                <p className="text-gray-700 line-clamp-3">{item.content}</p>
                {item.content.length > 100 && <button className="text-blue-500 hover:underline text-sm mt-1">Read More</button>}
                <Rate disabled value={item.ratings} className="text-yellow-500 text-sm mt-2" />
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>{item.place}</span>
                <span className="text-xs text-gray-400">{moment(item.date).format("DD MMM YYYY")}</span>
                <div className="flex gap-2">
                  <Tooltip title="Edit">
                    <EditOutlined
                      className="cursor-pointer text-blue-500 hover:text-blue-700 text-base"
                      onClick={() => {
                        form.setFieldsValue({ ...item, ratings: undefined });
                        setEditId(item._id);
                        setCurrentRating(item.ratings);
                        setOpen(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteOutlined className="cursor-pointer text-red-500 hover:text-red-700 text-base" onClick={() => handleDelete(item._id)} />
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal title={`${editId ? "Edit" : "Add"} Testimonial`} open={open} footer={false} onCancel={hanldeCancel} destroyOnClose>
        <Form form={form} layout="vertical" className="flex flex-col gap-y-4" onFinish={handleFinish}>
          <Form.Item name="user" rules={[requiredRules("Enter user Name")]} label="User Name">
            <Input placeholder="Enter User Name" className="antd_input h-[40px]" />
          </Form.Item>
          <Form.Item name="content" rules={[requiredRules("Enter content ")]} label="Testimonial Content">
            <TextArea placeholder="Testmonial Content" className="antd_input h-[80px]" />
          </Form.Item>
          <Form.Item name="place" rules={[requiredRules("Enter Place ")]} label="Place">
            <Input placeholder="Enter Place" className="antd_input h-[40px]" />
          </Form.Item>
          <Form.Item label="Ratings">
            <Rate value={currentRating} onChange={setCurrentRating} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit" block className="primary_btn ">
              {editId ? "Update" : "Add"} Testimonial
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Testmonial;
