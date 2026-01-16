import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyCart,
  removeFromCart,
  clearCart,
  addToCart
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const { items, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!hasFetched.current) {
      dispatch(getMyCart());
      hasFetched.current = true;
    }
  }, [dispatch, isAuthenticated, navigate]);

  /* ================= HANDLERS ================= */
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleIncrease = (id) => {
    dispatch(addToCart({ foodItemId: id, quantity: 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      handleRemove(item.foodItem._id);
    } else {
      dispatch(addToCart({ foodItemId: item.foodItem._id, quantity: -1 }));
    }
  };

  /* ================= TOTAL ================= */
  const totalAmount = items.reduce(
    (acc, item) => acc + item.foodItem.price * item.quantity,
    0
  );

  /* ================= LOADING (ONLY FETCH) ================= */
  if (loading.fetch) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.foodItem._id}
              className="flex gap-4 bg-white shadow rounded-xl p-4"
            >
              <img
                src={item.foodItem.image}
                alt={item.foodItem.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.foodItem.name}
                </h3>
                <p className="text-gray-600">₹{item.foodItem.price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => handleIncrease(item.foodItem._id)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-semibold">
                  ₹{item.foodItem.price * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.foodItem._id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="bg-white shadow rounded-xl p-6 w-full md:w-[50%]">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
             onClick={()=>navigate("/checkout")}
             className="w-full bg-orange-500 text-white py-3 rounded-full mb-3">
              Proceed to Checkout
            </button>

            <button
              onClick={handleClearCart}
              className="w-full border border-red-500 text-red-500 py-3 rounded-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
