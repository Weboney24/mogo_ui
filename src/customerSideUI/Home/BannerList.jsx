import React, { useEffect, useState } from "react";
import { ErrorNotification } from "../../helper/notification_helper";
import { getAllBanners } from "../../helper/api_helper";
import _ from "lodash";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getAllBanners();
      setBanners(_.shuffle(_.get(result, "data.data", [])));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full pb-5 px-4 md:px-8 lg:px-16 bg-white  gap_width  flex flex-col lg:flex-row items-center gap-2 justify-between">
      {banners.slice(0, 2).map((res, index) => {
        return <img key={index} src={res.banner_image} className="w-full lg:w-[50%] !border" />;
      })}
    </div>
  );
};

export default BannerList;
