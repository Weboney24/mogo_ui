/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IconHelper } from "../../../helper/IconHelper";
import DashboardHeader from "../../../component/DashboardHeader";
import _ from "lodash";
import { Avatar, Rate } from "antd"; // Import the Avatar and Rate components for styling
import { getAllReviews } from "../../../helper/api_helper";

const Review = () => {
  const [review, setreview] = useState([]);

  const fetchdata = async () => {
    try {
        const result = await getAllReviews();
        console.log(result, "sdsdsd");
      setreview(_.get(result, "data.reviews", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="dashboard_header_div !font-Poppins">
      <DashboardHeader name="Reviews" Icon={IconHelper.FOLDER_ICON} vendorShown={false} />
      <div className="reviews-list p-4">
        {review.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          review.map((res, index) => {
            return (
              <div key={index} className="review-card bg-white shadow-lg rounded-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                  <Avatar size={50} className="mr-4">
                    {_.get(res, "user_Details.[0].user_name", "Mogo").charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{_.get(res, "user_Details.[0].user_name", "Mogo")}</h3>
                    <p className="text-sm text-gray-500">{res.createdAt.split("T")[0]}</p>
                  </div>
                </div>

                <div className="review-content">
                  <Rate disabled defaultValue={res.ratings} className="mb-2" />
                  <p className="text-sm">{res.review}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Review;
