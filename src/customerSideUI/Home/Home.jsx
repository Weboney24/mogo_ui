import React from "react";
import Banner from "./Banner";
import CategoryLogo from "./CategoryLogo";
import SpecialOffers from "./SpecialOffers";
import TrendingProducts from "./TrendingProducts";
import NewArivals from "./NewArivals";
import BannerList from "./BannerList";
import Blogs from "./Blogs";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="w-screen bg-white min-h-screen">
      <Banner />
      <CategoryLogo />
      <SpecialOffers />
      <TrendingProducts />
      <BannerList />
      <NewArivals />
      <Testimonial />
      <Blogs />
    </div>
  );
};

export default Home;
