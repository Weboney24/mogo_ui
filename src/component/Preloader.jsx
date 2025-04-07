import { Skeleton } from "antd";

const Preloader = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((res, index) => {
    return (
      <Skeleton
        className="w-[280px] h-[200px] py-10 p-2"
        active
        key={index}
      ></Skeleton>
    );
  });
};

export default Preloader;
