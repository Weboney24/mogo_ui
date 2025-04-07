/* eslint-disable react/prop-types */

import { Collapse } from "antd";
import AllCategory from "./collapse/AllCategory";
import AllBrands from "./collapse/AllBrands";

const FilterView = ({
  categoryFilterChanged,
  category_filter,
  clearAll,
  setAllBransFilters,
  brand_filter,
}) => {
  const items = [
    {
      key: "1",
      label: "Category",
      children: (
        <AllCategory
          categoryFilterChanged={categoryFilterChanged}
          category_filter={category_filter}
        />
      ),
    },
    // {
    //   key: "2",
    //   label: "Brand",
    //   children: (
    //     <AllBrands
    //       setAllBransFilters={setAllBransFilters}
    //       brand_filter={brand_filter}
    //     />
    //   ),
    // },
    // {
    //   key: "3",
    //   label: "Price",
    //   children: <p>{"text"}</p>,
    // },
  ];
  return (
    <div className="">
      {/* filters */}
      <div className="center_div justify-between  h-[50px]">
        <h1 className="font-bold font-Poppins tracking-wider uppercase text-gray-600">Filters</h1>
        <h1
          onClick={() => {
            clearAll();
          }}
          className="text-sm text-secondary tracking-wider cursor-pointer"
        >
          Clear All
        </h1>
      </div>
      <hr />
      {/* categories */}
      <div>
        <Collapse defaultActiveKey={["1"]} bordered={false} items={items} expandIconPosition="end" />
      </div>
    </div>
  );
};

export default FilterView;
