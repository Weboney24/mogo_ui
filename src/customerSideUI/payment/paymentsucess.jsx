import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <CheckCircleIcon className="w-20 h-20 text-green-500" />
      <h1 className="text-3xl font-bold text-green-600 mt-4">Payment Successful</h1>
      <p className="text-gray-700 mt-2 text-center max-w-md">We are now processing your order. You will receive a confirmation email soon.</p>
      <button onClick={() => (window.location.href = "/my-orders")} className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-all">
        View My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
