/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const HeaderHelper = ({ first_name, to, second_name }) => {
  return (
    <div className="w-full flex items-center  justify-start">
      <h1 className="text-primary text-2xl">
        {first_name}&nbsp;
        <span className="text-secondary">{second_name}</span>
      </h1>
      {/* <h1 className=" text-[12px] hover:text-secondary hover:scale-105 cursor-pointer transition-all duration-700">View All</h1> */}
    </div>
  );
};

export default HeaderHelper;
