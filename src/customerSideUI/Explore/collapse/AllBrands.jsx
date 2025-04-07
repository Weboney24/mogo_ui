/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getallBrands } from "../../../helper/api_helper";
import _, { includes } from "lodash";
import { Checkbox } from "antd";

const AllBrands = ({ setAllBransFilters, brand_filter }) => {
  const [brands, setAllBrands] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getallBrands();
      console.log(result);
      setAllBrands(_.get(result, "data.data", []));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (id) => {
    if (brand_filter?.includes(id)) {
      setAllBransFilters(
        brand_filter?.filter((res) => {
          return res.id !== id;
        })
      );
    } else {
      setAllBransFilters(brand_filter?.push(id));
    }

  };

  const checkStatus = (id) => {
    const result = brand_filter?.filter((res) => {
      return res._id === id;
    });
    return _.isEmpty(result) ? false : true;
  };

  return (
    <div className="flex flex-col gap-y-3">
      {brands.map((res, index) => {
        return (
          <div key={index} className="flex items-center gap-x-2">
            <Checkbox
              className=""
              onChange={() => {
                handleFilterChange(res._id);
              }}
              checked={checkStatus(res._id)}
            />
            <h1 className="text-[14px] hover:text-secondary cursor-pointer">
              {res.brand_name}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default AllBrands;
