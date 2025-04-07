import React from "react";
import { Upload, Image } from "antd";
import { IconHelper } from "../helper/IconHelper";
import { readyToDisplay } from "../helper/ImageHelper";

const UploadHelper = (properties) => {
  const { imgUrl, setImgUrl } = properties;

  const handleChange = (value) => {
    try {
      const result = readyToDisplay(value);
      setImgUrl((pre =>({ ...pre, url: result, path: value.file.originFileObj })));
    } catch (err) {
      console.log(err, "hjhj");
    }
  };

  return (
    <div>
      {imgUrl.url ? (
        <div className="relative upload_ui !w-[100px]!h-[100px] group !border-none">
          <Image
            src={imgUrl.url}
            className="!w-[100px] !h-[100px] !object-cover rounded-lg"
            // preview={false}
          />
          <div className="absolute z-50 transition-all top-1 right-1 duration-500 bg-[#ffffff2a] center_div rounded ">
            {
              <IconHelper.DeleteIcon
                onClick={() => {
                  setImgUrl("");
                }}
                className="text-xl text-red-400 bg-white shadow-inner rounded-lg cursor-pointer"
              />
            }
          </div>
        </div>
      ) : (
        <Upload
          file={imgUrl}
          className="upload_ui cursor-pointer"
          showUploadList={false}
          onChange={handleChange}
          maxCount={1}
        >
          <IconHelper.uploadIcon className="text-gray-600 text-lg w-full h-full" />
        </Upload>
      )}
    </div>
  );
};

export default UploadHelper;
