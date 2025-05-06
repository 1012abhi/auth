import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyButton = ({ courseId, amount }) => {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);

    try {
      // Fetch Razorpay key
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_BASE_URL}/payment/getkey`);
      console.log('Razorpay Key:', key);

      if (!amount || isNaN(amount)) {
        console.error('Invalid amount:', amount);
        toast.error('Invalid amount provided.');
        return;
      }

      // Create an order
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/checkout`, { amount, courseId });
      const { order } = response.data;
      console.log('Order created successfully:', order);

      // Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Purchase Course",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_BASE_URL}/payment/paymentverification`,
        theme: { color: "#3399cc" },
        handler: function (response) {
          toast.success("Payment successful!");
          console.log("Payment successful:", response);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleOrder}
      className="bg-blue-500 text-white px-6 py-2 w-full rounded-lg hover:bg-blue-600 transition duration-300"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
};

export default BuyButton;