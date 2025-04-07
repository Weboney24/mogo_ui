/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllSubCategoryforCustomer } from "../../../helper/api_helper";
import _ from "lodash";

const AllCategory = ({ categoryFilterChanged, category_filter }) => {
  const [subCategory, setSubCtegory] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllSubCategoryforCustomer();
      setSubCtegory(_.get(result, "data.data", []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkStatus = (id) => {
    const result = category_filter?.filter((res) => {
      return res._id === id;
    });
    return _.isEmpty(result) ? false : true;
  };

  return (
    <div className="flex flex-col gap-y-3 w-full">
      {subCategory.map((res, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              categoryFilterChanged(res._id, res.sub_category_name);
            }}
          >
            <input type="radio" name="sub_category" className="!accent-secondary cursor-pointer" checked={checkStatus(res._id)} />
            <h1 className="text-[14px] hover:text-secondary cursor-pointer">{res.sub_category_name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategory;
