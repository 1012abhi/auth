import React from "react";
import PaymentWrapper from "../components/PaymentForm";

const PaymentPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <PaymentWrapper amount={50} currency="usd" /> {/* Example: $50 */}
    </div>
  );
};

export default PaymentPage;