import moment from "moment";
import React, { useEffect, useState } from "react";

const ExpiredUiHelper = ({ date }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    setResult(moment.duration(moment(date).diff(Date.now())));
  }, [moment()]);

  return (
    result && (
      <div>
        <div className="flex items-center mb-1">
          <div className="min-w-[36px] text-[12px]">Day</div>
          <div className="min-w-[36px] text-[12px]">Hrs</div>
          <div className="min-w-[36px] text-[12px]">Min</div>
          <div className="min-w-[36px] text-[12px]">Sec</div>
        </div>
        <div className="flex items-center">
          <div className="min-w-[36px]  text-[12px]">{result.days()}</div>
          <div className="min-w-[36px]  text-[12px]">{result.hours()}</div>
          <div className="min-w-[36px]  text-[12px]">{result.minutes()}</div>
          <div className="min-w-[36px]  text-[12px]">{result.seconds()}</div>
        </div>
      </div>
    )
  );
};

export default ExpiredUiHelper;
