// CancelOrderButton.jsx
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";

const CancelOrderButton = ({ onConfirm }) => {
  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to cancel this order?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Cancel It",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onConfirm(); // Call the cancelOrder function from parent
      },
    });
  };

  return (
    <Button danger type="primary" onClick={showConfirm}>
      Cancel Order
    </Button>
  );
};

export default CancelOrderButton;
