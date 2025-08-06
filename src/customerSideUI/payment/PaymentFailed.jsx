import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <XCircleIcon className="w-20 h-20 text-red-500" />
      <h1 className="text-3xl font-bold text-red-600 mt-4">Payment Failed</h1>
      <p className="text-gray-700 mt-2 text-center max-w-md">Unfortunately, your payment could not be processed. Please try again or choose a different payment method.</p>
      <button onClick={() => (window.location.href = "/checkout")} className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all">
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;
