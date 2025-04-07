import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

const CustomerLayout = () => {
  return (
    <div className="bg-white ">
      <TopNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CustomerLayout;
