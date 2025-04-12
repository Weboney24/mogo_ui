/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Avatar, Rate } from "antd";
import { IconHelper } from "../../helper/IconHelper";
import { ImageHelper } from "../../helper/ImageHelper";
import { getTestmonail } from "../../helper/api_helper";
import _ from "lodash";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTestmonail();
        setTestimonials(_.get(result, "data", []));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full h-auto px-[6vw] py-10">
      <p className="font-title text-center text-primary pb-3">Testimonial</p>
      <h1 className="text-3xl text-secondary font-semibold text-center">
        Regards <span className="text-primary">From</span> Users
      </h1>

      <div className="relative flex items-center mt-6">
        <div ref={prevRef} className="absolute left-0 z-20 cursor-pointer -ml-3">
          <IconHelper.ROUNDED_OUTLINE_LEFTARROW className="text-3xl opacity-70 hover:opacity-100 transition duration-300" />
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[Navigation]}
          className="mySwiper w-full"
        >
          {testimonials.map((res, index) => (
            <SwiperSlide key={index} className="py-3">
              <div className="flex flex-col items-center w-full h-auto bg-gray-100 px-4 py-8 shadow-md rounded-lg">
                <p className="text-center italic mb-4">“{res.content}”</p>
                <Rate allowHalf disabled defaultValue={res.ratings} className="mb-3" />
                <div className="flex items-center gap-3">
                  <Avatar src={res.img} size={50}>
                    {res.user.charAt(0)}
                  </Avatar>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{res.user}</h3>
                    <p className="text-sm opacity-70">{res.place}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={nextRef} className="absolute right-0 z-20 cursor-pointer -mr-3">
          <IconHelper.ROUNDED_OUTLINE_RIGHTARROW className="text-3xl opacity-70 hover:opacity-100 transition duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
