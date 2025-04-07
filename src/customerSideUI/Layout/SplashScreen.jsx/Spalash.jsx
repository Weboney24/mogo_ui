import { ImageHelper } from "../../../helper/ImageHelper";
import { SyncOutlined } from "@ant-design/icons";

const Spalash = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center flex-col gap-y-2 relative">
      <img src={ImageHelper.Logo} alt="" className="!w-[150px]" />
      <p className="absolute bottom-[100px] flex items-center gap-x-4">
        Please Wait..... &nbsp;
        <SyncOutlined spin className="!text-secondary" />
      </p>
    </div>
  );
};

export default Spalash;
