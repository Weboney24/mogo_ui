import { ImageHelper } from "../../helper/ImageHelper";
import {
  CaretRightOutlined,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";
import Cards from "../../assets/banner/ban.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 1, name: "About Us", link: "/about" },
    { id: 1, name: "Contact Us", link: "/contact" },
    { id: 1, name: "Help Center", link: "/contact" },
  ];

  const information = [
    { id: 1, name: "Terms & Conditions", link: "/terms-and-conditions", l: "" },
    { id: 1, name: "Privacy", link: "/privacy_policy" },
    { id: 1, name: "Return & Refund Policy", link: "/contact" },
    { id: 1, name: "Shipping Policy", link: "/contact" },
    { id: 1, name: "Help Center", link: "/contact" },
  ];

  const social = [
    { id: 1, name: "@mogo_ecomm", icon: <FacebookFilled /> },
    { id: 2, name: "@mogo_ecommernce", icon: <InstagramFilled /> },
  ];

  return (
    <div>
      <div className="w-full bg-primary min-h-[300px] py-10 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 justify-between">
        <div className="w-full lg:w-[20%] flex flex-col gap-y-4 text-white">
          <img
            src={ImageHelper.Logo}
            alt=""
            className="bg-white w-[150px] sm:w-[200px] p-1 rounded-lg mx-auto lg:mx-0"
          />
          <p className="tracking-wider text-justify text-sm sm:text-base">
            Our platform is designed to provide you with the tools and support
            you need to create a successful online business.
          </p>
        </div>
        <div className="w-full lg:w-[20%]">
          <h1 className="text-2xl text-secondary font-Poppins tracking-wider">
            Quick Links
          </h1>
          <div className="flex flex-col gap-y-2 pt-2">
            {quickLinks.map((res, index) => (
              <Link
                to={res.link}
                className="text-white cursor-pointer flex items-center gap-x-2"
                key={index}
              >
                <CaretRightOutlined className="!text-[10px]" /> {res.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[20%]">
          <h1 className="text-2xl text-secondary font-Poppins tracking-wider">
            Information
          </h1>
          <div className="flex flex-col gap-y-2 pt-2">
            {information.map((res, index) => (
              <Link
                to={res.link}
                className="text-white cursor-pointer flex items-center gap-x-2"
                key={index}
              >
                <CaretRightOutlined className="!text-[10px]" /> {res.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[20%]">
          <h1 className="text-2xl text-secondary font-Poppins tracking-wider">
            Follow Us
          </h1>
          <div className="flex flex-col gap-y-2 pt-2">
            {social.map((res, index) => (
              <Link
                to={res.link}
                className="text-white cursor-pointer flex items-center gap-x-2"
                key={index}
              >
                {res.icon} {res.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-center py-4 px-5 sm:px-10 lg:px-20 bg-[#535278] h-[auto] text-white">
        <h1 className="!text-sm text-center lg:text-left mb-4 lg:mb-0">
          Copyright 2024 Mogo - All Rights Reserved. Designed and Developed By
          Weboney
        </h1>
        <img
          src={Cards}
          alt="Banner"
          className="w-[80%] sm:w-[60%] lg:w-[15%] mb-4 lg:mb-0"
        />
      </div>
    </div>
  );
};

export default Footer;
