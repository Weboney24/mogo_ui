import { useEffect, useState } from "react";
import HeaderHelper from "./HeaderHelper";
import { ErrorNotification } from "../../helper/notification_helper";
import { getAllSpecialProducts } from "../../helper/api_helper";
import _ from "lodash";
import SwiperCard from "../Layout/SwiperCard";

const SpecialOffers = () => {
  const [specialProducts, setSpecialProducts] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getAllSpecialProducts();
      setSpecialProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" pt-10 px-4 md:px-8 lg:px-16 w-screen gap_width font-Poppins">
      <HeaderHelper first_name={"Special"} second_name={"Offers"} />
      <br />
      <div className="w-full">
        <SwiperCard product={specialProducts} />
      </div>
    </div>
  );
};

export default SpecialOffers;
