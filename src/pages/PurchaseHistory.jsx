import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get("https://upcode-1.onrender.com/api/v1/getPurchaseHistory", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(data.purchases || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
  <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-16">
    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-yellow-400">
      Purchase History
    </h1>

    {purchases.length === 0 ? (
      <p className="text-center text-gray-400 text-lg">No purchases yet.</p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {purchases.map((purchase, index) => (
          <div
            key={index}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 flex flex-col"
          >
            <img
              src={purchase.courseId.thumbnail}
              alt={purchase.courseId.courseName}
              className="rounded-md mb-4 w-full h-48 sm:h-40 object-cover"
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 line-clamp-2">
              {purchase.courseId.courseName}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 line-clamp-3">
              {purchase.courseId.courseDescription}
            </p>

            <div className="mt-4 text-sm sm:text-base text-gray-400 space-y-1">
              <p>💰 Amount: ₹{purchase.amount / 100}</p>
              <p>🆔 Payment ID: {purchase.paymentId}</p>
              <p>📅 Date: {new Date(purchase.date).toLocaleDateString()}</p>
            </div>

            <span
              className={`inline-block mt-4 px-3 py-1 text-xs sm:text-sm font-bold rounded-full ${
                purchase.status === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {purchase.status}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default PurchaseHistory;
