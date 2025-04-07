/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/modules";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import _ from "lodash";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { ImageHelper } from "../../helper/ImageHelper";
import { addToWishList, collectMyWishList, updateMyWishList } from "../../helper/api_helper";
import { useDispatch } from "react-redux";
import { ListCount } from "../../redux/favSlice";
import { successMessage } from "../../helper/notification_helper";
import { CartStatus } from "../../helper/filter_helper";
import { useSelector } from "react-redux";
import { MakeLoginStatus } from "../../redux/logintriger";

const SwiperCard = ({ product }) => {
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
      // eslint-disable-next-line no-empty
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
  }, [_.get(userData, "list_slice.value.count", "")]);

  const handleAddtoFavorite = async (product_id, variant_id) => {
    try {
      if (!localStorage.getItem("customers_token")) {
        return dispatch(
          MakeLoginStatus({
            count: "Login",
          })
        );
      }
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

  return (
    <Swiper spaceBetween={10} slidesPerView={6} navigation={true} loop={true} modules={[Navigation]} autoplay={true} className="!pb-5 !w-full">
      {product?.map((res, index) => {
        return (
          <SwiperSlide
            onMouseEnter={() => {
              setid(res._id);
            }}
            onMouseLeave={() => {
              setid();
            }}
            key={index}
            className="cursor-grab mb-1  select-none !w-[280px] min-h-[350px] !font-sans  transition-shadow duration-500 bg-white"
          >
            <Link to={`/produt_details/${res._id}`}>
              <img src={_.get(res, `product_images[${res._id === id ? checkImage(res) : 0}]`, "")} className=" w-[280px] !h-[250px] object-fill  !cursor-pointer" />
            </Link>
            <div className="flex flex-col px-3 pb-4 relative">
              <h1 className=" line-clamp-1 !font-sans !font-medium pt-2 !text-secondary">{_.get(res, `product_name`, "")}</h1>

              <h1 className="text-[12px] text-slate-500 font-medium px-[.70px]">{_.get(res, `product_sub_category_nameactual`, "")}</h1>
              <div className="py-1">
                <Rate allowHalf value={4.8} className="!text-[14px] !text-secondary" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-1 font-Poppins">
                  <h1 className="text-gray-400 line-through text-sm">₹{_.get(res, `product_variants[0].mogo_mrp_price`, "")}</h1>
                  <h1 className="text-sm">₹{_.get(res, `product_variants[0].mogo_selling_price`, "")}</h1>
                </div>
                <div className="">
                  <img
                    onClick={() => {
                      handleAddtoFavorite(_.get(res, "_id", ""), _.get(res, "product_variants[0].varient_unique_id", ""));
                    }}
                    src={CartStatus(wishlistData, _.get(res, "product_variants[0].varient_unique_id", "")) ? ImageHelper.WhishListFull : ImageHelper.WhishListEmpty}
                    alt=""
                    className="!w-[20px] hover:scale-125 transition-all duration-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperCard;
