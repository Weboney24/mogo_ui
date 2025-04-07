import { createBrowserRouter } from "react-router-dom";
import VendorRegistration from "../pages/auth/VendorRegistration";
import Signin from "../pages/auth/Vendor_Signin";
import Layout from "../pages/Dashboard/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Category from "../pages/Dashboard/category/Category";
import Subcategory from "../pages/Dashboard/category/Subcategory";
import ProductCategory from "../pages/Dashboard/category/ProductCategory";
import Product from "../pages/Dashboard/Product/Product";
import OfferProducts from "../pages/Dashboard/special/OfferProducts";
import FeaturedProducts from "../pages/Dashboard/special/FeaturedProducts";
import NewArivals from "../pages/Dashboard/special/NewArivals";
import Banners from "../pages/Dashboard/banners/Banners";
import Coupons from "../pages/Dashboard/coupon/Coupons";
import CustomerLayout from "../customerSideUI/Layout/CustomerLayout";
import Home from "../customerSideUI/Home/Home";
import Store from "../pages/Dashboard/store/Store";
import Order from "../pages/Dashboard/orders/Order";
import DeliveryLocations from "../pages/Dashboard/delivery/DeliveryLocations";
import UpdateStoreProfile from "../pages/Dashboard/profile/UpdateStoreProfile";
import DeliveryCharge from "../pages/Dashboard/delivery/DeliveryCharge";
import Invoiceview from "../pages/Dashboard/orders/Invoiceview";
import Brand from "../pages/Dashboard/category/Brand";
import Fabric from "../pages/Dashboard/category/Fabric";
import ProductDeatils from "../customerSideUI/extrascreen/ProductDeatils";
import Explore from "../customerSideUI/Explore/Explore";
import User from "../pages/Dashboard/store/User";
import Income from "../pages/Dashboard/orders/Income";
import CommingSoon from "../customerSideUI/Layout/CommingSoon";
import Spalash from "../customerSideUI/Layout/SplashScreen.jsx/Spalash";
import { ProfileHome } from "../customerSideUI/Profile/ProfileHome";
import Profile from "../customerSideUI/Profile/Profile";
import CartCustomer from "../customerSideUI/Cart/CartCustomer";
import CheckoutScreen from "../customerSideUI/Checkout/CheckoutScreen";
import WishList from "../customerSideUI/Cart/WishList";
import Contact from "../pages/rest/Contact";
import About from "../pages/rest/About";
import Terms from "../pages/rest/policy/Terms";
import PrivacyPolicy from "../pages/rest/policy/PrivacyPolicy";
import Review from "../pages/Dashboard/review/Review";
import Testmonial from "../pages/Dashboard/testmonial/Testmonial";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/contact",
    element: <CustomerLayout />,
    children: [
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/about",
    element: <CustomerLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/terms-and-conditions",
    element: <CustomerLayout />,
    children: [
      {
        path: "/terms-and-conditions",
        element: <Terms />,
      },
    ],
  },
  {
    path: "/privacy_policy",
    element: <CustomerLayout />,
    children: [
      {
        path: "/privacy_policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "/explore",
    element: <CustomerLayout />,
    children: [
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <Signin />,
  // },
  {
    path: "/invoice/:id",
    element: <Invoiceview />,
  },
  {
    path: "/comming_soon",
    element: <CommingSoon />,
  },
  {
    path: "/produt_details/:id",
    element: <CustomerLayout />,
    children: [
      {
        path: "/produt_details/:id",
        element: <ProductDeatils />,
      },
    ],
  },
  {
    path: "/vendor_registration",
    element: <VendorRegistration />,
  },
  {
    path: "/vendor_signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/dashboard/category",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/category",
        element: <Category />,
      },
    ],
  },
  {
    path: "/dashboard/sub_category",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/sub_category",
        element: <Subcategory />,
      },
    ],
  },
  {
    path: "/dashboard/product_category",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/product_category",
        element: <ProductCategory />,
      },
    ],
  },
  {
    path: "/dashboard/products",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/products",
        element: <Product />,
      },
    ],
  },
  {
    path: "/dashboard/special_offers",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/special_offers",
        element: <OfferProducts />,
      },
    ],
  },
  {
    path: "/dashboard/trending_products",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/trending_products",
        element: <FeaturedProducts />,
      },
    ],
  },
  {
    path: "/dashboard/new_arival",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/new_arival",
        element: <NewArivals />,
      },
    ],
  },
  {
    path: "/dashboard/banners",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/banners",
        element: <Banners />,
      },
    ],
  },
  {
    path: "/dashboard/reviews",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/reviews",
        element: <Review />,
      },
    ],
  },
  {
    path: "/dashboard/testmonial",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/testmonial",
        element: <Testmonial />,
      },
    ],
  },
  {
    path: "/dashboard/coupon",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/coupon",
        element: <Coupons />,
      },
    ],
  },
  {
    path: "/dashboard/store",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/store",
        element: <Store />,
      },
    ],
  },
  {
    path: "/dashboard/users",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/users",
        element: <User />,
      },
    ],
  },
  {
    path: "/dashboard/orders",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/orders",
        element: <Order />,
      },
    ],
  },
  {
    path: "/dashboard/income",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/income",
        element: <Income />,
      },
    ],
  },
  {
    path: "/dashboard/delivery_distance",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/delivery_distance",
        element: <DeliveryLocations />,
      },
    ],
  },
  {
    path: "/dashboard/delivery_charge",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/delivery_charge",
        element: <DeliveryCharge />,
      },
    ],
  },
  {
    path: "/dashboard/update_profile",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/update_profile",
        element: <UpdateStoreProfile />,
      },
    ],
  },
  {
    path: "/dashboard/all_brands",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/all_brands",
        element: <Brand />,
      },
    ],
  },
  {
    path: "/dashboard/fabric_types",
    element: <Layout />,
    children: [
      {
        path: "/dashboard/fabric_types",
        element: <Fabric />,
      },
    ],
  },
  {
    path: "/my_profile",
    element: <CustomerLayout />,
    children: [
      {
        path: "/my_profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/my_cart",
    element: <CustomerLayout />,
    children: [
      {
        path: "/my_cart",
        element: <CartCustomer />,
      },
    ],
  },
  {
    path: "/my_wishlist",
    element: <CustomerLayout />,
    children: [
      {
        path: "/my_wishlist",
        element: <WishList />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CustomerLayout />,
    children: [
      {
        path: "/checkout",
        element: <CheckoutScreen />,
      },
    ],
  },
]);
