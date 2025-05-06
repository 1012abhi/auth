import React from "react";
import axios from "axios";

const RazorpayPayment = ({ amount, currency, courseId }) => {
  const handlePayment = async () => {
    try {
      // Create an order on the backend
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-order`, {
        amount,
        currency,
        courseId,
      });

      const { orderId, paymentId } = response.data;

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID, // Razorpay key ID
        amount: amount * 100, // Amount in paise
        currency: currency || "INR",
        name: "Your Company Name",
        description: "Course Payment",
        order_id: orderId,
        handler: async function (response) {
          // Verify payment on the backend
          const verifyResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/payment/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId,
            }
          );

          if (verifyResponse.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayPayment;