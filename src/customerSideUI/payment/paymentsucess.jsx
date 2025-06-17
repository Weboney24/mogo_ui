import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const order_id = searchParams.get("merchant_param1");  

    if (!order_id) {
      console.error("Missing order_id");
      return;
    }

    const finalizeOrder = async () => {
      try {
        const res = await axios.post("/api/order/payment-success", { order_id });
        console.log("✅ Order finalized", res.data);
      } catch (err) {
        console.error("❌ Error finalizing order:", err);
      }
    };

    finalizeOrder();
  }, [searchParams]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-2">We are now processing your order. You will receive a confirmation soon.</p>
    </div>
  );
};

export default PaymentSuccess;
