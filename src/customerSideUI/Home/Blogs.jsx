import { IconHelper } from "../../helper/IconHelper";
import HeaderHelper from "./HeaderHelper";

const Blogs = () => {
  const BLOGS_DATA = [
    {
      id: 1,
      title: "Transform Your Home with the Best in Home Textiles",
      short: "Discover the latest trends in home textiles that bring comfort, style, and warmth to every room.",
      long: "Home textiles are essential for creating a cozy and inviting atmosphere in any living space. From soft bed linens to luxurious curtains, the right textiles can transform your home’s look and feel. Whether you’re after comfort, aesthetics, or practicality, choosing high-quality materials and stylish designs will make all the difference. Explore sustainable fabrics, patterns that are trending, and tips on caring for textiles to keep them looking fresh and vibrant. Let your home reflect your style with thoughtfully selected textiles.",
    },
    {
      id: 2,
      title: "A Guide to Shopping for Fresh, Quality Groceries",
      short: "Your ultimate guide to picking fresh, nutritious, and quality groceries for your kitchen.",
      long: "Shopping for groceries can be a fulfilling experience when you know what to look for. Choosing fresh vegetables, quality grains, and organic products contributes to a healthier lifestyle and balanced diet. This guide will help you navigate the essentials, from understanding labels to finding local, sustainable options that ensure you’re feeding your family the best. With tips on seasonal buying, storage hacks, and mindful shopping, you’ll have everything you need to fill your kitchen with nutritious foods.",
    },
    {
      id: 3,
      title: " Stay Stylish: Top Fashion Trends of the Season",
      short: "Elevate your wardrobe with the latest fashion trends designed to keep you looking chic and feeling confident.",
      long: "Fashion is ever-evolving, and each season brings new trends that make style exciting and accessible. Whether you’re drawn to bold prints, minimalist cuts, or eco-friendly materials, there’s something for everyone. This season, sustainable fashion is in the spotlight, with many embracing timeless pieces that combine style and responsibility. Discover key items to invest in, styling tips, and insights into popular colors and patterns that will refresh your look. Embrace fashion as an expression of your personality and values, and enjoy curating a wardrobe that speaks to you.",
    },
  ];

  return (
    <div className="w-screen gap_width px-4 md:px-8 lg:px-16 font-Poppins">
      <HeaderHelper first_name={"Latest"} second_name={"Blog Posts"} />
      <br />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
        {BLOGS_DATA.map((res, index) => {
          return (
            <div key={index} className="min-h-[200px] pb-10 bg-white shadow-sm flex flex-col gap-y-2">
              <img src="https://cdn.dribbble.com/userupload/37370303/file/original-ec96d0ae0ca7a6ea5576478b6e9b999e.png?format=webp&resize=320x240&vertical=center" alt="" className="w-full h-[250px]" />
              <h1 className="pt-2 pb-1 font-Poppins">{res.title}</h1>
              <div className="center_div justify-start gap-x-4">
                <div className="!text-sm !font-sans center_div gap-x-2">
                  <IconHelper.FOLDER_ICON />
                  <span>lifestyle</span>
                </div>
                <div className="!text-sm !font-sans center_div gap-x-2">
                  <IconHelper.TIME_ICON />
                  <span>2 weeks ago</span>
                </div>
              </div>
              <p className="!text-sm text-gray-700 line-clamp-2 !font-sans">{res.short}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
