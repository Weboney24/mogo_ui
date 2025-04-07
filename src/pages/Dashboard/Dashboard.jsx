import { Card } from "antd";
import { useSelector } from "react-redux";
import DashboardHeader from "../../component/DashboardHeader";
import { IconHelper } from "../../helper/IconHelper";
import Count from "./dashboarditems/Count";

const Dashboard = () => {
  const userData = useSelector((data) => data);

  return (
    <div className="dashboard_header_div">
      <DashboardHeader name="Dashboard" Icon={IconHelper.dashboardIcon} />
      <Count />
    </div>
  );
};

export default Dashboard;
