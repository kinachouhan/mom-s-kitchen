import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const items = useSelector((state) => state.cart.items);


    const totalAmount = items.reduce(
        (acc, item) => acc + item.foodItem.price * item.quantity,
        0
    );

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        email: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    // Prefill user info
    useEffect(() => {
        if (user) {
            setAddress({
                firstName: user.address?.firstName || "",
                lastName: user.address?.lastName || "",
                phone: user.address?.phone || "",
                street: user.address?.street || "",
                city: user.address?.city || "",
                state: user.address?.state || "",
                zipcode: user.address?.zipcode || "",
                country: user.address?.country || "",
                email: user.address?.email || user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async () => {
        if (!items || items.length === 0) {
            return toast.error("Your cart is empty!");
        }

        // 🔹 transform cart items → order items
        const orderItems = items.map((item) => ({
            foodItemId: item.foodItem._id,
            foodItemName: item.foodItem.name,
            price: item.foodItem.price,
            quantity: item.quantity,
            image: item.foodItem.image
        }));

        setLoading(true);

        try {
            const order = await dispatch(
                placeOrder({
                    items: orderItems,
                    total: totalAmount,
                    paymentMethod,
                    userData: address,
                })
            ).unwrap();

            toast.success("Order placed successfully!");

            navigate("/place-order", {
                state: { orderId: order._id },
            });

        } catch (error) {
            toast.error(
                typeof error === "string" ? error : "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <section className="max-w-7xl mx-auto p-6 py-30">


            <div className="flex flex-col md:flex-row gap-6">

                {/* DELIVERY INFO */}
                <div className="bg-white sm:w-[60%] p-5 md:p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-5 text-gray-800">
                        Delivery Information
                    </h2>

                    {/* NAME */}
                    <div className="space-y-3 mb-4">
                        <input
                            type="text"
                            name="firstName"
                            value={address.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={address.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                        />
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-3 mb-4">
                        <input
                            type="text"
                            name="phone"
                            value={address.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            value={address.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                        />
                    </div>

                    {/* ADDRESS */}
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="w-full border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                            />
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                placeholder="State"
                                className="border rounded-xl px-4 py-3 text-sm  border-gray-300  outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="zipcode"
                                value={address.zipcode}
                                onChange={handleChange}
                                placeholder="Zip Code"
                                className="border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                            />
                            <input
                                type="text"
                                name="country"
                                value={address.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className="border rounded-xl px-4 py-3 text-sm  border-gray-300 outline-none"
                            />
                        </div>
                    </div>
                </div>


                {/* ORDER SUMMARY */}
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-auto">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Order Summary
                        </h2>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.foodItem._id}
                                    className="flex justify-between border-b border-gray-500 pb-2"
                                >
                                    <span className="font-medium">{item.foodItem.name} x {item.quantity}</span>
                                    <span className="font-medium">₹{item.foodItem.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-bold text-lg mt-4  pt-2">
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className="mt-4 flex flex-col space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                    className="accent-orange-400"
                                />
                                <span>Cash on Delivery</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="Online"
                                    checked={paymentMethod === "Online"}
                                    onChange={() => setPaymentMethod("Online")}
                                    className="accent-orange-400"
                                />
                                <span>Online Payment</span>
                            </label>
                        </div>
                    </div>

                    <div><button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full mt-6 w-full"
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button></div>
                </div>
            </div>


        </section>

    );
};
