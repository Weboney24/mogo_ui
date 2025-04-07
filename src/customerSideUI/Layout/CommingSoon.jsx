import { Tooltip } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CommingSoon = () => {
  return (
    <div className="w-screen h-screen bg-[linear-gradient(to_right_bottom,#fcfffa2a,#fcfffa79),url('https://img.freepik.com/free-vector/realistic-coming-soon-background_52683-59078.jpg?t=st=1717735077~exp=1717738677~hmac=3556ea6a4ba007a44f0ea5a26aa2eb9b6afca74b1e59047053e6a935698a88d7&w=900')] bg-cover bg-center">
      <Tooltip title={"Go Back"}>
        <Link
          to={"/"}
          className="w-[60px] h-[60px] bg-white shadow-2xl group rounded-full absolute top-10 left-10 center_div"
        >
          <FaArrowLeftLong className="!text-2xl cursor-pointer group-hover:scale-y-150" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default CommingSoon;
