import React, { useEffect, useState } from "react";
import HeaderHelper from "./HeaderHelper";
import { ErrorNotification } from "../../helper/notification_helper";
import { getAllSpecialProducts, getAllTrendingProducts } from "../../helper/api_helper";
import _ from "lodash";
import ProductCard from "../Layout/ProductCard";
import SwiperCard from "../Layout/SwiperCard";

const TrendingProducts = () => {
  const [specialProducts, setSpecialProducts] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getAllTrendingProducts();
      setSpecialProducts(_.get(result, "data.data", []));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen px-4 md:px-8 lg:px-16 gap_width font-Poppins">
      <HeaderHelper first_name={"Trending"} second_name={"Products"} />
      <br />
      <div className="w-full">
        <SwiperCard product={specialProducts} />
      </div>
    </div>
  );
};

export default TrendingProducts;
