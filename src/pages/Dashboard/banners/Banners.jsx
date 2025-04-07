import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import { Button, Form, Image, Input, Modal, Select, Skeleton, Tag } from "antd";
import UploadHelper from "../../../component/UploadHelper";
import { requiredRules } from "../../../helper/form_validation";
import { ErrorNotification, successMessage, SuccessNotification } from "../../../helper/notification_helper";
import { craeteBanner, deleteBanner, getAllProducts, getBanner, getMyProducts } from "../../../helper/api_helper";
import _ from "lodash";
import { getProductName } from "../../../helper/filter_helper";

const Banners = () => {
  let initialImages = {
    url: "",
    path: "",
  };

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(initialImages);
  const [productData, setProductData] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const result = await Promise.all([getAllProducts(), getBanner()]);
      setProductData(_.get(result, "[0].data.data", []));
      setBannerData(_.get(result, "[1].data.data", []));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hanldeCancel = () => {
    setOpen(false);
    form.resetFields();
    setImgUrl(initialImages);
  };

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      values.product_name = _.get(getProductName(values.product_id, productData), "[0].product_name", "");
      formData.append("image", imgUrl.path);
      formData.append("values", JSON.stringify(values));

      let result = "";
      result = await craeteBanner(formData);
      SuccessNotification(result);
      fetchData();
      hanldeCancel();
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const result = await deleteBanner(id);
      SuccessNotification(result);
      fetchData();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard_header_div !font-Poppins">
        <DashboardHeader name="Banners" Icon={IconHelper.BannerIcon} vendorShown={false} adminShown={true} open={open} setOpen={setOpen} />
        <Skeleton loading={loading} active className="w-full pt-10">
          <div className="flex flex-wrap min-h-fit pt-2 gap-4">
            {bannerData.map((res, index) => {
              return (
                <div className="w-[300px] min-h-[200px] pb-1 shadow bg-white rounded-lg">
                  <Image src={res.banner_image} className="!object-cover !w-[300px] !h-[150px] rounded-lg  p-1" />
                  <div className="flex flex-col px-3 gap-y-3">
                    <p className="flex items-center gap-x-2">
                      <IconHelper.BannerIcon className="text-gray-500 !size-[12px]" /> <p className="line-clamp-1 text-sm">{res.banner_name}</p>
                    </p>
                    <p className="flex items-center gap-x-2">
                      <IconHelper.productIcon className="text-gray-500 !size-[12px]" />
                      <p className="line-clamp-1 text-sm">{res.product_name}</p>
                      <IconHelper.linkIcon
                        className="text-gray-500 cursor-pointer hover:text-primary
                    !size-[12px]"
                      />
                    </p>
                  </div>
                  <div className="flex px-3 items-center  gap-x-2 py-4">
                    {/* <Tag
                      color="#6aac43"
                      className="flex items-center gap-x-1 cursor-pointer"
                    >
                      <IconHelper.EditIcon className="text-white cursor-pointer" />
                      Edit
                    </Tag> */}
                    <Tag
                      color="#33325e"
                      className="flex items-center gap-x-1 cursor-pointer"
                      onClick={() => {
                        handleDelete(res._id);
                      }}
                    >
                      <IconHelper.DeleteIcon className="text-white cursor-pointer" />
                      Delete
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </Skeleton>
      </div>
      <Modal title="Add New Banner" open={open} footer={false} onCancel={hanldeCancel} destroyOnClose>
        <Form form={form} layout="vertical" className="flex flex-col gap-y-4" onFinish={handleFinish}>
          <Form.Item name="banner_image" label="Banner Image">
            <UploadHelper imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </Form.Item>
          <Form.Item name="banner_name" rules={[requiredRules("Enter Banner Name")]} label="Banner Name">
            <Input placeholder="Banner Name" className="antd_input h-[40px]" />
          </Form.Item>
          <Form.Item name="product_id" rules={[requiredRules("Select Product")]} label="Product Name">
            <Select className="antd_input2" placeholder="Select Product">
              {productData.map((res, index) => {
                return (
                  <Select.Option value={res._id}>
                    <div className="flex text-center gap-x-2 justify-between">
                      {res.product_name}
                      <Image src={_.get(res, "product_images[0][0]", "")} className="!w-[25px] !h-[25px] rounded-lg" />
                    </div>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit" block className="primary_btn ">
              {editId ? "Update" : "Add"} Banner
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Banners;
