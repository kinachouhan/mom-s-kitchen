import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-semibold">
        Loading your orders...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <h2 className="text-2xl font-semibold">No Orders Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6"
          >
           
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-3  pb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID
                </p>
                <p className="font-semibold text-sm md:text-base">
                  #{order._id}
                </p>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-gray-100">
                  {order.paymentMethod}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    order.paymentStatus === "Completed"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

        
            <div className="mt-4 space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm md:text-base"
                >
                  <span className="font-medium">
                    {item.foodItemName} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

         
            <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="font-semibold text-lg">
                Total: ₹{order.total}
              </span>

              <button
                onClick={() =>
                  navigate("/place-order", {
                    state: { orderId: order._id },
                  })
                }
                className="text-orange-500 font-semibold hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
