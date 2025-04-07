import React, { useEffect, useState } from "react";
import { getCategoryInfo } from "../customapi";
import _ from "lodash";
import { Card, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";

const CategoryLogo = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getCategoryInfo();
      setCategoryData(_.get(result, "[0]data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (name) => {
    if (name === "Home textiles") {
      navigate("/explore");
    } else {
      navigate("/comming_soon");
    }
  };

  return (
    <div className="w-full pt-10 bg-white px-4 md:px-8 lg:px-16 gap-10 flex flex-wrap lg:flex-row items-center justify-center">
      {categoryData.map((res, index) => {
        return (
          <Skeleton
            loading={loading}
            key={index}
            active
            className="w-[150px] h-[150px] px-2"
          >
            <div
              onClick={() => {
                handleCategoryClick(res.category_name);
              }}
              className={`w-[150px]  h-[150px] hover:scale-125 transition-all duration-700 cursor-pointer  shadow-lg rounded-2xl center_div flex-col gap-y-2 ${
                index % 2 === 0 ? "bg-primary" : "bg-secondary"
              }`}
            >
              <img src={res.category_image} className="size-[30%]" />
              <h1 className="font-Poppins text-white capitalize text-[12px]">
                {res.category_name}
              </h1>
            </div>
          </Skeleton>
        );
      })}
    </div>
  );
};

export default CategoryLogo;
