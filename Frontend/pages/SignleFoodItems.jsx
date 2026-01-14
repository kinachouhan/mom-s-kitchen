import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

export const SingleFooditems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  /* ================= STATES ================= */
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tabs & reviews
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]); // future API
  const [count, setCount] = useState(0);
  const canReview = false; // change later when order logic added

  /* ================= FETCH FOOD ================= */
  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/v1/food-item/${id}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Food not found");
          return;
        }

        setFood(data.responseData);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleCart = () => {
    if (!isAuthenticated) navigate("/login");
    else navigate("/cart");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-red-500 font-semibold">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-orange-500 font-medium"
      >
        ← Back
      </button>

      {/* ================= MAIN CARD ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-md p-6">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{food.name}</h1>

          <p className="text-gray-600">
            {food.description || "Fresh homemade food prepared with love."}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{food.price}
            </span>
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {food.category}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleCart}
              className="bg-orange-100 text-orange-600 hover:bg-orange-200 px-6 py-3 rounded-full font-medium transition"
            >
              Order Now
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <p>🍲 Freshly cooked after order</p>
            <p>🧼 Hygienic kitchen</p>
            <p>🚚 Safe & fast delivery</p>
            <p>💵 Cash on delivery</p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="my-16">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-medium transition ${
              activeTab === "description"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-medium transition ${
              activeTab === "reviews"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500"
            }`}
          >
            Reviews ({count})
          </button>
        </div>

        {/* DESCRIPTION */}
        {activeTab === "description" && (
          <div className="border border-t-0 p-6 text-sm text-gray-600 space-y-3">
            <p>
              This food item is freshly prepared using quality ingredients
              in a clean home kitchen.
            </p>
            <p>
              Cooked on the same day of delivery to ensure authentic taste
              and freshness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <p>🍲 Homemade taste</p>
              <p>🧼 Hygienic preparation</p>
              <p>🚚 Timely delivery</p>
              <p>💵 Cash on delivery</p>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="border border-t-0 p-6 space-y-6">
            {!isAuthenticated && (
              <div className="bg-gray-100 border p-4 text-sm">
                Please{" "}
                <span
                  className="text-orange-500 font-semibold cursor-pointer underline"
                  onClick={() => navigate("/login")}
                >
                  login
                </span>{" "}
                to write a review.
              </div>
            )}

            {isAuthenticated && !canReview && (
              <div className="bg-yellow-50 border border-yellow-300 p-4 text-sm">
                You must order this food item before submitting a review.
              </div>
            )}

            {/* Reviews List */}
            <div className="border-t pt-6">
              <h2 className="font-semibold mb-4">
                Customer Reviews ({count})
              </h2>

              {reviews.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No reviews yet. Be the first to review!
                </p>
              )}

              {reviews.map((r) => (
                <div key={r._id} className="py-4 border-b">
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-sm ${
                          star <= r.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium">{r.user}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
