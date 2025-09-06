import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BuyCourse = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    // 1. Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Check internet connection.");
      return;
    }

    // 2. Call backend to create order
    console.log("👉 Token in frontend before request:", token);

    const { data } = await axios.post(
      "https://upcode-1.onrender.com/api/v1/capturePayment",
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("backend payment data", data);

    if (!data.success) {
      alert(data.message);
      return;
    }

    // 3. Open Razorpay checkout
    const options = {
      key: "rzp_test_Xgn4ze9r2JyFLk", // from Razorpay dashboard
      amount: data.amount,
      currency: data.currency,
      name: data.courseName,
      description: data.courseDescription,
      image: data.thumbnail,
      order_id: data.orderId,
      handler: async function (response) {
  console.log("👉 Razorpay handler response:", response);

  try {
    const verifyRes = await axios.post(
      "https://upcode-1.onrender.com/api/v1/verifySignature",
      {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        courseId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ Verify API response:", verifyRes.data);
    alert(verifyRes.data.message);
    navigate("/dashboard/enrolled-Courses");
  } catch (err) {
    console.error("❌ Error verifying payment:", err);
    alert("Payment verification failed!");
  }
},
      prefill: {
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#FDE047",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Buy Course</h1>
      <p className="mb-4">
        You are about to purchase course ID:{" "}
        <span className="text-yellow-400">{courseId}</span>
      </p>
      <button
        onClick={handleBuyNow}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
      >
        Buy Now
      </button>
    </div>
  );
};

export default BuyCourse;


