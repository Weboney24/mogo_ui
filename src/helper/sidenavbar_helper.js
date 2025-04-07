import { IconHelper } from "./IconHelper";

export const getItem = (label, key, icon, children, type, onClick) => {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  };
};

export const sidenavbarItems = [
  {
    key: "/dashboard",
    name: "Dashboard",
    icon: IconHelper.dashboardIcon,
    paths: ["/dashboard"],
  },
  {
    name: "Products",
    icon: IconHelper.productIcon,
    key: "/dashboard/products",
    paths: ["/dashboard/products"],
    // children: [
    //   {
    //     key: 22,
    //     name: "Products",
    //     icon: IconHelper.plusIcon,
    //     paths: ["/add_products"],
    //   },
    // ],
  },
  {
    key: 3,
    name: "Categories",
    icon: IconHelper.categoryIcon,
    children: [
      {
        key: "/dashboard/category",
        name: "Category",
        icon: IconHelper.catIocn,
        paths: ["/dashboard/category"],
      },
      {
        key: "/dashboard/sub_category",
        name: "Sub Category",
        icon: IconHelper.subCatIcons,
        paths: ["/dashboard/sub_category"],
      },
      {
        key: "/dashboard/product_category",
        name: "Product Category",
        icon: IconHelper.productCatIcon,
        paths: ["/dashboard/product_category"],
      },
      {
        key: "/dashboard/all_brands",
        name: "Brand",
        icon: IconHelper.brandIcon,
        paths: ["/dashboard/all_brands"],
      },
      {
        key: "/dashboard/fabric_types",
        name: "Fabric",
        icon: IconHelper.fabricIcon,
        paths: ["/dashboard/fabric_types"],
      },
    ],
  },
  {
    key: "/dashboard/store",
    name: "All Vendors",
    icon: IconHelper.storeIcon,
    paths: ["/dashboard/store"],
  },
  {
    key: "/dashboard/users",
    name: "All Users",
    icon: IconHelper.customerIcon,
    paths: ["/dashboard/users"],
  },
  {
    key: "/dashboard/orders",
    name: "Orders",
    icon: IconHelper.orderIcon,
    paths: ["/dashboard/orders"],
  },
  {
    key: 6,
    name: "Special Products",
    icon: IconHelper.displayGroup,
    children: [
      {
        key: "/dashboard/special_offers",
        name: "Special Offers",
        icon: IconHelper.OffersIcon,
        paths: ["/dashboard/special_offers"],
      },
      {
        key: "/dashboard/trending_products",
        name: "Trending Products",
        icon: IconHelper.featuredIcons,
        paths: ["/dashboard/trending_products"],
      },
      {
        key: "/dashboard/new_arival",
        name: "New Arivals",
        icon: IconHelper.newArivals,
        paths: ["/dashboard/new_arival"],
      },
    ],
  },
  {
    key: "/dashboard/banners",
    name: "Banners",
    icon: IconHelper.BannerIcon,
    paths: ["/dashboard/banners"],
  },
  {
    key: "/dashboard/reviews",
    name: "Reviews",
    icon: IconHelper.FOLDER_ICON,
    paths: ["/dashboard/reviews"],
  },
  {
    key: "/dashboard/testmonial",
    name: "Testmonial",
    icon: IconHelper.BannerIcon,
    paths: ["/dashboard/testmonial"],
  },
  {
    key: "/dashboard/coupon",
    name: "Coupons",
    icon: IconHelper.couponIcon,
    paths: ["/dashboard/coupon"],
  },
  {
    key: 10,
    name: "Shipping",
    icon: IconHelper.deliveryIcon,
    children: [
      // {
      //   key: "/dashboard/delivery_distance",
      //   name: "Delivery Distance",
      //   icon: IconHelper.deliveryLocation,
      //   paths: ["/dashboard/delivery_distance"],
      // },
      {
        key: "/dashboard/delivery_charge",
        name: "Delivery Charges",
        icon: IconHelper.moneyIcon,
        paths: ["/dashboard/delivery_charge"],
      },
    ],
  },
  // {
  //   key: "/dashboard/income",
  //   name: "Income",
  //   icon: IconHelper.moneyIcon,
  //   paths: ["/dashboard/income"],
  // },
];

// export const getKey = (path) => {
//   const result = sidenavbarItems.filter((res) => {});
// };
