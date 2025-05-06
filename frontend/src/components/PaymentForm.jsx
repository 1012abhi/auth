import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_your_publishable_key");

const PaymentForm = ({ amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create a payment intent on the backend
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-payment-intent`, {
        amount,
        currency,
      });

      const { clientSecret } = response.data;
console.log("Client Secret:", clientSecret);

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
      <CardElement className="p-3 border border-gray-300 rounded-md mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

const PaymentWrapper = ({ amount, currency }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} currency={currency} />
    </Elements>
  );
};

export default PaymentWrapper;