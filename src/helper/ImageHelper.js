import _ from "lodash";
import { message } from "antd";
import Logo from "../assets/mogo/logo/logo.png";
import BannerImg1 from "../assets/banner/1.png";
import BannerImg2 from "../assets/banner/2.png";
import BannerBuy from "../assets/banner/bottom/buy.jpg";
import Bannertrending from "../assets/banner/bottom/trending.png";
import BannerBestSeller from "../assets/banner/bottom/bestsellers.png";
import BannerCoupon from "../assets/banner/bottom/coupons.png";
import BannerNewLaunch from "../assets/banner/bottom/newlaunches.png";
import bannerBg from "../assets/banner/bannerBg.jpg";
import List from "../assets/heartOne.png";
import List2 from "../assets/heartTwo.png";
import testimoniallogo from "../assets/mogo/svgviewer-output.svg";

export const ImageHelper = {
  Logo,
  BannerImg1,
  BannerImg2,
  BannerBuy,
  Bannertrending,
  BannerBestSeller,
  BannerCoupon,
  BannerNewLaunch,
  bannerBg,
  WhishListEmpty: List,
  WhishListFull: List2,
  testimoniallogo: testimoniallogo,
};

export const beforeUpload = (value) => {
  try {
    console.log(_.get(value, "fileList[0].size", ""));
    if (_.get(value, "file.status", "") === "error") {
      if (_.get(value, "fileList[0].size", "") > 1024 * 1024 * 4) {
        message.error("File Size must be under 4 MB");
        throw new Error();
      } else if (
        !["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(
          _.get(value, "fileList[0].type", "")
        )
      ) {
        message.error(
          "The image format should be limited to PNG, JPG, or JPEG only."
        );
        throw new Error();
      }
      return true;
    }
  } catch (err) {}
};

export const readyToDisplay = (value) => {
  try {
    const result = beforeUpload(value);
    if (result) {
      return URL.createObjectURL(value.file.originFileObj);
    }
  } catch (err) {}
};
