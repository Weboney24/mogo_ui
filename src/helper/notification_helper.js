import { message, notification } from "antd";
import _ from "lodash";

export const ErrorNotification = (err) => {
  let err_message = _.get(err, "response.data.message", "");
  notification.error({ message: err_message });
};

export const successMessage = (value) => {
  notification.success({ message: value });
};

export const SuccessNotification = (result) => {
  let success_message = _.get(result, "data.message", "");
  message.success(success_message);
};

export const errorMessage = (value) => {
  notification.error({ message: value });
};
