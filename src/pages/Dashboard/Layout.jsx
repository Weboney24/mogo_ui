/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidenavbar from "../../component/Sidenavbar";
import TopNavbar from "../../component/TopNavbar";
import { getCurrentUserRole } from "../../helper/api_helper";
import _ from "lodash";

// redux
import { useDispatch, useSelector } from "react-redux";
import { changeRole } from "../../redux/roleSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const role = useSelector((data) => data);

  const fetchRole = async () => {
    try {
      const result = await getCurrentUserRole();

      dispatch(changeRole(_.get(result, "data", "")));
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div className="flex !font-Poppins">
      <div className="w-[14vw] fixed">
        <Sidenavbar />
      </div>
      <div className="pl-[14vw] flex flex-col w-full bg-light_gray">
        <div className="w-[86vw] h-[50px] bg-white !z-50  fixed top-0">
          <TopNavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
