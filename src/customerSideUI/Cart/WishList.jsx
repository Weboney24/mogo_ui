/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { Spin } from "antd";
import { IconHelper } from "../../helper/IconHelper";
import { useEffect, useState } from "react";
import { collectMyWishList, getMyWishList } from "../../helper/api_helper";
import { ListCount } from "../../redux/favSlice";
import { useDispatch } from "react-redux";
import ProductCard from "../Layout/ProductCard";
import _ from "lodash";
import ProductCard2 from "../Layout/ProductCard2";

const WishList = () => {
  const [loading, setLoading] = useState(false);

  const [myCarProducts, setMyCartProducts] = useState([]);

  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyWishList();
      const carts = await collectMyWishList();
      setMyCartProducts(_.get(carts, "data.data", []));
      dispatch(ListCount({ count: _.get(carts, "data.data", []).length }));
      setSearchResult(_.get(result, "data.data", []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen min-h-screen px-4 md:px-8 lg:px-16 py-10 !select-none">
      <Spin spinning={false}>
        <div className="flex items-center justify-between pt-10">
          <h1 className="font-Poppins flex items-center gap-x-2">
            <IconHelper.HeartIcon /> My WishList
          </h1>
        </div>
        <div className="w-full h-auto pt-5 lg:pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
          <ProductCard2 product={searchResult} fetchDatas={fetchData} />
        </div>
      </Spin>
    </div>
  );
};

export default WishList;
