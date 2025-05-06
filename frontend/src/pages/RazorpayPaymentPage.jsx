import React from "react";
import RazorpayPayment from "../components/RazorpayPayment";

const RazorpayPaymentPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <RazorpayPayment amount={500} currency="INR" courseId="6815b57c332614a4191e0690" />
    </div>
  );
};

export default RazorpayPaymentPage;