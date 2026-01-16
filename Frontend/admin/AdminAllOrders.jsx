
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../redux/orderSlice";
import { GrDeliver } from "react-icons/gr";

export const AdminAllOrders = () => {
   const dispatch = useDispatch();
   const { orders, loading } = useSelector((state) => state.order);

   useEffect(() => {
      dispatch(getAllOrders());
   }, [dispatch]);

   if (loading) return (
      <div className="h-[60vh] flex justify-center items-center">
         <div className="animate-spin h-12 w-12 border-b-2 border-orange-500 rounded-full" />
      </div>
   );

   return (
      <section className="max-w-7xl mx-auto p-4 sm:p-8">
         <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">All Orders</h1>

         {orders.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No orders found</p>
         )}

         <div className="flex flex-col gap-6">
            {orders.map((order) => (
               <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 hover:shadow-lg transition-shadow"
               >
                  {/* LEFT: Delivery icon + Products + User */}
                  <div className="flex gap-4 md:gap-6 items-start md:items-center w-full md:w-2/3">
                     <GrDeliver className="text-5xl sm:text-6xl text-gray-700 border p-2 rounded-xl" />

                     <div className="flex flex-col gap-1">
                        {order.items.map((item, index) => (
                           <h2
                              key={`${order._id}-${index}`} // ✅ unique key using index
                              className="font-semibold text-gray-800 text-sm sm:text-base"
                           >
                              {item.productName} x {item.quantity}
                           </h2>
                        ))}

                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mt-1">
                           {order.userData.firstName} {order.userData.lastName}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                           {order.userData.street}, {order.userData.city}, {order.userData.state}
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">{order.userData.phone}</p>
                     </div>
                  </div>

                  {/* RIGHT: Amount + Payment + Status */}
                  <div className="flex flex-col md:items-end items-start w-full md:w-auto mt-4 md:mt-0 gap-2">
                     <h2 className="font-bold text-lg sm:text-xl text-gray-900">₹{order.total}</h2>

                     <h3 className="font-semibold text-sm sm:text-base">
                        Payment:{" "}
                        <span
                           className={
                              order.paymentStatus === "Completed"
                                 ? "text-green-600"
                                 : "text-orange-500"
                           }
                        >
                           {order.paymentStatus}
                        </span>
                     </h3>

                     <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                        Mode: {order.paymentMethod}
                     </h3>

                     <select
                        value={order.status || "Order Placed"} // default to avoid undefined
                        onChange={(e) => {
                           const newStatus = e.target.value;
                           if (newStatus !== order.status) {
                              dispatch(
                                 updateOrderStatus({
                                    orderId: order._id, // ✅ pass correct order ID
                                    status: newStatus,
                                 })
                              );
                           }
                        }}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-48 text-sm sm:text-base mt-1"
                     >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Pending">Pending</option>
                        <option value="Packing">Packing</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                     </select>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};
