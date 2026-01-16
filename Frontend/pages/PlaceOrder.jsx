
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useSelector((store) => store.order.orders || []);
  const order = orders.find((o) => o._id === location.state?.orderId);

  if (!order) {
    return (
     
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-500">
            Order not found
          </h1>
        </div>

    );
  }

  return (
  
      <div className="min-h-screen py-10 border-t border-gray-200">
        {/* ===== SUCCESS HEADER ===== */}
        <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
          <CheckCircle size={80} className="text-green-600" />
          <h1 className="text-3xl md:text-5xl font-bold">
            Thanks for shopping with{" "}
            <span className="text-black">Mom’s Kitchen!</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium">
            Your order has been placed successfully 🎉
          </p>
        </div>

        {/* ===== ORDER DETAILS ===== */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-500 pb-6">
            ORDER <span className="text-black">DETAILS</span>
          </h2>

          {/* ===== ITEMS ===== */}
          <div className="flex flex-col gap-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between gap-4 border border-gray-200 rounded-lg p-4 md:p-6"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.foodItemName}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md"
                  />

                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">
                      {item.foodItemName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                   
                  </div>
                </div>

                <div className="text-lg font-bold self-end md:self-center">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* ===== TOTALS ===== */}
          <div className="mt-8 border-t border-b py-4 flex flex-col gap-3 text-lg">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.total}</span>
            </div>

            <div className="flex justify-between font-bold text-xl">
              <span>Total Amount</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* ===== DELIVERY + ACTION ===== */}
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-8">
            {/* Address */}
            <div className="flex flex-col gap-1 text-gray-700">
              <h3 className="text-lg font-semibold mb-2">
                Delivery Address
              </h3>
              <p>{order.userData.firstName} {order.userData.lastName}</p>
              <p>{order.userData.street}</p>
              <p>
                {order.userData.city}, {order.userData.state}{" "}
                {order.userData.zipcode}
              </p>
              <p>{order.userData.country}</p>
              <p>📞 {order.userData.phone}</p>
              <p>✉️ {order.userData.email}</p>
            </div>

            {/* Button */}
            <div className="flex md:items-end">
              <button
                onClick={() => navigate("/orders")}
                className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-900 transition"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
   
  );
};
