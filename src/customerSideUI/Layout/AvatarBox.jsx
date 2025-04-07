/* eslint-disable react/prop-types */
import { Avatar } from "antd";
import _ from "lodash";
import { useSelector } from "react-redux";

const AvatarBox = ({ width, height, size }) => {
  const userData = useSelector((data) => data);
console.log(_.get(userData, "product.value.user_profile", ""));
  return (
    <>
      {_.get(userData, "product.value.user_profile", "") ? (
        <Avatar
          style={{ width: width | 30, height: height | 30 }}
          src={_.get(userData, "product.value.user_profile", "")}
        />
      ) : (
        <Avatar
          style={{
            background: _.get(userData, "product.value.profile_color", ""),
            width: width | 30,
            height: height | 30,
            fontSize: size | 14
          }}
        >
          {_.get(userData, "product.value.name", "")
            .split("")[0]
            ?.toUpperCase()}
        </Avatar>
      )}
    </>
  );
};

export default AvatarBox;
