/* eslint-disable react/jsx-key */
import { Form, Image, Input, Upload } from "antd";

import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { removeImages, uploadImages } from "../../../../helper/api_helper";
import {
  ErrorNotification,
  successMessage,
} from "../../../../helper/notification_helper";
import _ from "lodash";

const ProductImages = (properties) => {
  const { images, setImgUrl, role } = properties;

  const handleImages = async (img) => {
    try {
      const formData = new FormData();
      _.get(img, "fileList", []).map((res) => {
        formData.append("images", res.originFileObj);
      });
      const result = await uploadImages(formData);
      setImgUrl([...images, _.get(result, "data.data", [])]);
      successMessage(_.get(result, "data.messages", ""));
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    }
  };

  const handleClick = async (data) => {
    try {
      const result = await removeImages({ path: data });
      setImgUrl(
        images.filter((res) => {
          return res != data;
        })
      );
      successMessage(_.get(result, "data.message", ""));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      {images.length === 5 ? (
        ""
      ) : (
        <Form.Item name="product_images">
          {role != "admin" && (
            <Upload
              fileList={images}
              maxCount={5}
              showUploadList={false}
              onChange={handleImages}
            >
              <div className="!w-[100px] !h-[100px] center_div border border-dashed rounded-lg cursor-pointer">
                <UploadOutlined />
              </div>
            </Upload>
          )}
        </Form.Item>
      )}

      {images.map((res) => {
        return (
          <div className="relative !w-[100px] !h-[100px]">
            <Image
              className="!w-[100px] !h-[100px] shadow-inner border-2 !rounded-lg !p-1"
              src={res}
            />
            {role != "admin" && (
              <div className="absolute w-[25px] h-[25px] bg-white center_div rounded-bl-2xl top-0 right-0">
                <DeleteOutlined
                  onClick={() => handleClick(res)}
                  className="!text-red-500 !cursor-pointer"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductImages;
