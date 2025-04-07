/* eslint-disable no-duplicate-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Menu } from "antd";
import { ImageHelper } from "../helper/ImageHelper";
import { getItem, sidenavbarItems } from "../helper/sidenavbar_helper";

import { useNavigate, useHref, useLocation } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";

const Sidenavbar = () => {
  const navigate = useNavigate();
  const path = useHref();
  const location = useLocation();
  const role = useSelector((data) => data);

  // redirect
  useEffect(() => {
    if (path.split("/")[1] === "dashboard") {
      if (!localStorage.getItem("vendor_token")) {
        navigate("/vendor_signin");
      }
    }
  }, [path, role]);

  const items = (
    _.get(role, "role.currentRole.role", "") === "admin"
      ? sidenavbarItems
      : sidenavbarItems.filter((res) => {
          return !["Banners", "Special Products", "Coupons", "All Vendors", "Delivery", "Shipping", "All Users", "Reviews", "Testmonial"].includes(res.name);
        })
  ).map((res) => {
    return getItem(
      res.name,
      res.key,
      <res.icon />,
      !_.isEmpty(_.get(res, "children", []))
        ? _.get(res, "children", []).map((item) => {
            return getItem(item.name, item.key, <item.icon />);
          })
        : ""
    );
  });

  const handleRedirect = (path) => {
    switch (path.key) {
      case "/dashboard": {
        navigate("/dashboard");
        break;
      }

      case "/dashboard/products": {
        navigate("/dashboard/products");
        break;
      }
      case "/dashboard/category": {
        navigate("/dashboard/category");
        break;
      }
      case "/dashboard/sub_category": {
        navigate("/dashboard/sub_category");
        break;
      }
      case "/dashboard/product_category": {
        navigate("/dashboard/product_category");
        break;
      }
      case "/dashboard/special_offers": {
        navigate("/dashboard/special_offers");
        break;
      }
      case "/dashboard/trending_products": {
        navigate("/dashboard/trending_products");
        break;
      }
      case "/dashboard/new_arival": {
        navigate("/dashboard/new_arival");
        break;
      }
      case "/dashboard/banners": {
        navigate("/dashboard/banners");
        break;
      }
      case "/dashboard/reviews": {
        navigate("/dashboard/reviews");
        break;
      }
      case "/dashboard/testmonial": {
        navigate("/dashboard/testmonial");
        break;
      }
      case "/dashboard/coupon": {
        navigate("/dashboard/coupon");
        break;
      }
      case "/dashboard/store": {
        navigate("/dashboard/store");
        break;
      }
      case "/dashboard/orders": {
        navigate("/dashboard/orders");
        break;
      }
      case "/dashboard/delivery_distance": {
        navigate("/dashboard/delivery_distance");
        break;
      }
      case "/dashboard/delivery_charge": {
        navigate("/dashboard/delivery_charge");
        break;
      }
      case "/dashboard/all_brands": {
        navigate("/dashboard/all_brands");
        break;
      }
      case "/dashboard/fabric_types": {
        navigate("/dashboard/fabric_types");
        break;
      }
      case "/dashboard/users": {
        navigate("/dashboard/users");
        break;
      }
      case "/dashboard/income": {
        navigate("/dashboard/income");
        break;
      }
    }
  };

  return (
    <div className="bg-white  w-full h-screen overflow-scroll">
      <div className="fixed left-0 !z-50 bg-white w-[14vw] h-[100px] center_div">
        <div className="w-full center_div py-5 ">
          <img src={ImageHelper.Logo} alt="" className="w-[120px]" />
        </div>
      </div>
      <div className="pt-[100px]">
        <Menu
          defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
          mode="vertical"
          className="flex flex-col gap-y-2 "
          items={items}
          onClick={(e) => {
            handleRedirect(e);
          }}
        />
      </div>
    </div>
  );
};

export default Sidenavbar;
