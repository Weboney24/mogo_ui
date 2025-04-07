/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { Empty, Rate } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageHelper } from "../../helper/ImageHelper";
import { useDispatch, useSelector } from "react-redux";
import { CartStatus } from "../../helper/filter_helper";
import {
  addToWishList,
  collectMyWishList,
  updateMyWishList,
} from "../../helper/api_helper";
import { successMessage } from "../../helper/notification_helper";
import { ListCount } from "../../redux/favSlice";

const ProductCard2 = ({ product, fetchDatas }) => {
  const [id, setid] = useState();

  const [loading, setLoading] = useState(false);

  const [wishlistData, setWishlistData] = useState([]);

  const userData = useSelector((data) => data);

  const dispatch = useDispatch();

  const checkImage = (res) => {
    try {
      if (_.get(res, `product_images[1]`, "")) {
        return 1;
      } else {
        return 0;
      }
    } catch (err) {}
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const carts = await collectMyWishList();
      setWishlistData(_.get(carts, "data.data", []));

      dispatch(ListCount({ count: _.get(carts, "data.data", []).length }));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDatas();
  }, [product, _.get(userData, "list_slice.value.count", "")]);

  const handleAddtoFavorite = async (product_id, variant_id) => {
    try {
      setLoading(true);
      if (CartStatus(wishlistData, variant_id)) {
        await updateMyWishList({ id: variant_id });
        successMessage("Product Removed From Favorite List");
        return fetchData();
      }
      let formData = {
        variant_id: variant_id,
        product_id: product_id,
      };
      await addToWishList(formData);
      successMessage("Product Added To Favorite List");
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return _.isEmpty(product) ? (
    <div>
      <Empty />
    </div>
  ) : (
    <>
      {product.map((res, index) => {
        return (
          <div
            target="_blank"
            onMouseEnter={() => {
              setid(res.product_id.product_id._id);
            }}
            onMouseLeave={() => {
              setid();
            }}
            key={index}
            className=" min-h-[300px] w-auto font-Poppins  rounded-lg transition-shadow duration-500 bg-white"
          >
            <Link to={`/produt_details/${res.product_id._id}`} target="_blank">
              <img
                src={_.get(
                  res,
                  `product_id.product_images[${
                    res.product_id._id === id ? checkImage(res) : 0
                  }]`,
                  ""
                )}
                className="!h-[200px] !w-full object-fill rounded-t-lg"
              />
            </Link>
            <div className="flex flex-col px-2 pb-2 relative">
              <h1 className="text-[#353434] line-clamp-1 pt-1">
                {_.get(res, `product_id.product_name`, "")}
              </h1>
              <h1 className="text-[12px] text-slate-400 px-[.70px]">
                {_.get(res, `product_id.product_sub_category_nameactual`, "")}
              </h1>
              <div className="py-1">
                <Rate allowHalf defaultValue={2.5} className="!text-[14px]" />
              </div>
              <div className="flex gap-x-1 font-Poppins">
                <h1 className="text-gray-400 line-through text-sm">
                  ₹
                  {_.get(
                    res,
                    `product_id.product_variants[0].mogo_mrp_price`,
                    ""
                  )}
                </h1>
                <h1 className="text-sm">
                  ₹
                  {_.get(
                    res,
                    `product_id.product_variants[0].mogo_selling_price`,
                    ""
                  )}
                </h1>
              </div>
              <div className="absolute right-4 bottom-4 ">
                <img
                  onClick={() => {
                    handleAddtoFavorite(
                      _.get(res, "product_id._id", ""),
                      _.get(
                        res,
                        "product_id.product_variants[0].varient_unique_id",
                        ""
                      )
                    );
                  }}
                  src={
                    CartStatus(
                      wishlistData,
                      _.get(
                        res,
                        "product_id.product_variants[0].varient_unique_id",
                        ""
                      )
                    )
                      ? ImageHelper.WhishListFull
                      : ImageHelper.WhishListEmpty
                  }
                  alt=""
                  className="!w-[20px] hover:scale-125 transition-all duration-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard2;
