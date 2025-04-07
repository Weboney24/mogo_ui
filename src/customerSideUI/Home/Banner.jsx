import { Avatar, Card, Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { getAllBannerforCustomer } from "../../helper/api_helper";
import _ from "lodash";
import { ImageHelper } from "../../helper/ImageHelper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { bannerButtom } from "../../helper/banner_carosal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllBannerforCustomer();
      setBannerData(_.get(result, "data.data", []));
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let BannerData = [
    {
      id: 1,
      img: ImageHelper.BannerImg1,
      content: `Discover quality premium basics and trendy essentials at surprisingly affordable prices`,
    },
    {
      id: 2,
      img: ImageHelper.BannerImg2,
      content: `Discover quality premium basics and trendy essentials at surprisingly affordable prices`,
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${ImageHelper.bannerBg})` }}
      className="w-full min-h-screen select-none flex items-center flex-col justify-center bg-no-repeat bg-cover pb-10 px-4 md:px-8 lg:px-16"
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="w-full"
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        centeredSlides
      >
        {BannerData.map((res, index) => (
         <SwiperSlide key={index} className="w-screen !font-Poppins !flex flex-col lg:flex-row items-center lg:items-start pt-10 lg:pt-20 justify-center lg:justify-between">
         <div className="flex flex-col gap-4 w-full lg:w-1/2 text-center lg:text-left">
           <h1 className="text-4xl md:text-5xl lg:text-6xl text-white !font-sans !font-medium leading-snug">
             Buy Nice and Unique <br /> Textile Products
           </h1>
           <h1 className="text-lg md:text-xl lg:text-2xl !text-slate-300 leading-relaxed">
             {res.content}
           </h1>
           <Link to={"/explore"}>
             <button className="w-full sm:w-fit h-[50px] px-6 sm:px-10 mt-5 bg-secondary rounded text-sm text-white tracking-wide hover:bg-opacity-80 transition-all">
               Explore More
             </button>
           </Link>
         </div>
         <img
           src={res.img}
           className="w-[60%] sm:w-[40%] lg:w-[30%] mx-auto lg:mx-0 mt-6 lg:mt-0"
           alt="Banner"
         />
       </SwiperSlide>
       
        ))}
      </Swiper>

      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 w-full pt-12">
        {bannerButtom.slice(0, 4).map((res, index) => (
          <div
            key={index}
            className="w-full sm:w-[330px] flex items-start py-6 px-4 gap-x-4 rounded-lg h-auto sm:h-[180px] bg-white shadow-md"
          >
            <img src={res.icon} className="w-[50px] h-[50px]" alt="Icon" />
            <div className="flex flex-col gap-y-2">
              <h1 className="font-Poppins font-semibold">{res.heading}</h1>
              <p className="text-gray-500 text-sm line-clamp-3">{res.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
