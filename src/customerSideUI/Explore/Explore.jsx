/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import FilterView from "./FilterView";
import { ErrorNotification } from "../../helper/notification_helper";
import {
  getAllExploreProducts,
  getCutomerProductCategory,
} from "../../helper/api_helper";
import _ from "lodash";

import ProductCard from "../Layout/ProductCard";
import { Select } from "antd";
import { IconHelper } from "../../helper/IconHelper";
import DefaultLoading from "../Layout/DefaultLoading";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const [exploreProducts, setExploreProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [dummySubcategory, setDummySubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category_filter, setcategoryFilter] = useState([]);
  const [subcategory_filter, setSubcategory_filter] = useState("");

  const [brand_filter, setAllBransFilters] = useState([]);

  const location = useLocation();

  const fetchData = async () => {
    try {
      setLoading(true);
      let search = {
        category: category_filter,
        subProduct: subcategory_filter,
        brandValue: brand_filter,
      };
      const result = await Promise.all([
        getAllExploreProducts(JSON.stringify(search)),
        getCutomerProductCategory(),
      ]);
      setExploreProducts(_.get(result, "[0].data.data", []));
      setSubcategoryData(_.get(result, "[1].data.data", []));
      if (_.get(location, "state.subcat.sub_category_name", "")) {
        setDummySubcategory(
          _.get(result, "[1].data.data", [])?.filter((res) => {
            return (
              res.sub_category_name === _.get(location, "state.subcat._id", "")
            );
          })
        );
      }
    } catch (e) {
      ErrorNotification(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category_filter, subcategory_filter, ]);
console.log(brand_filter,"hffbrand_filter")
  useEffect(() => {
    if (_.get(location, "state.subcat.sub_category_name", "")) {
      categoryFilterChanged(
        _.get(location, "state.subcat._id", ""),
        _.get(location, "state.subcat.sub_category_name", "")
      );
    }
  }, [_.get(location, "state.subcat.sub_category_name", "")]);

  const categoryFilterChanged = (id, name) => {
    setcategoryFilter([{ _id: id, name: name }]);
    setDummySubcategory(
      subcategoryData?.filter((res) => {
        console.log(id, name, res.sub_category_name);
        return res.sub_category_name === id;
      })
    );
    setSubcategory_filter();
  };

  const clearAll = () => {
    setcategoryFilter([]);
    setSubcategory_filter();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subcategory_filterChanged = (id) => {
    try {
      setSubcategory_filter(id);
    } catch (err) {}
  };

  return (
    <div className="w-screen min-h-screen border-t bg-white center_div items-start">
      <div className="w-full min-h-full py-10 px-4 md:px-8 lg:px-16 bg-white gap-x-4 flex flex-col lg:flex-row items-start justify-between gap-5 lg:gap-10">
        <div className="w-full lg:w-[20%] sticky top-0 z-20 bg-white px-2">
          <FilterView categoryFilterChanged={categoryFilterChanged} category_filter={category_filter} clearAll={clearAll} setAllBransFilters={setAllBransFilters} brand_filter={brand_filter} />
        </div>
        <div className="w-full lg:w-[80%] min-h-full">
          {!_.isEmpty(category_filter) && (
            <div className="flex flex-col md:flex-row gap-2 h-auto lg:h-[50px] items-center px-3 justify-between">
              <div>
                {category_filter.map((res, index) => {
                  return (
                    <div
                      onClick={() => {
                        setcategoryFilter([]);
                        setSubcategory_filter();
                      }}
                      key={index}
                      className="flex items-center cursor-pointer gap-x-2 group hover:bg-secondary hover:text-white border-secondary rounded w-fit  text-[14px] h-[25px] px-2 py-4 text-secondary"
                    >
                      <p>{res.name} </p>
                      <IconHelper.multiplyIcon className="text-red-500 group-hover:text-white !text-[10px] cursor-pointer" />
                    </div>
                  );
                })}
              </div>
              {/* sub category filtre */}
              <div className="px-4 font-Poppins text-slate-500 flex items-center">
                <Select
                  className="!min-w-[150px]"
                  allowClear
                  placeholder="filter by sub category"
                  onChange={(e) => {
                    subcategory_filterChanged(e);
                  }}
                  value={subcategory_filter}
                >
                  {dummySubcategory.map((res, index) => {
                    return (
                      <Select.Option key={index} value={res._id}>
                        {res.product_category_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          )}
          <div className={`!w-full mt-3 min-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-3 gap-y-6  ${_.isEmpty(exploreProducts) ? " justify-center items-start" : "justify-normal"} `}>{loading ? <DefaultLoading /> : <ProductCard product={exploreProducts} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
