import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoodItems } from "../redux/fooditemSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AdminAddFooditemsList = () => {
   const { foodItems, loading } = useSelector((state) => state.foodItems);
   const dispatch = useDispatch();
   const API = import.meta.env.VITE_API_URL;

   useEffect(() => {
      dispatch(fetchAllFoodItems());
   }, [dispatch]);


   const handleDelete = async (id) => {
      try {
         const res = await fetch(`${API}/api/v1/food-item/delete/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });

         const data = await res.json();

         if (res.ok) {
            dispatch(fetchAllFoodItems()); 
            toast.success("Food item deleted successfully")
          
         } else {
            toast.error(data.message || "Failed to delete food item")
         }
      } catch (error) {
         console.error("Delete error:", error);
         alert("Something went wrong while deleting");
      }
   };


   if (loading) {
      return (
         <div className="flex justify-center items-center h-[60vh] text-gray-500">
            Loading food items...
         </div>
      );
   }

   return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
         {/* HEADER */}
         <h1 className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
            Food Items List
         </h1>

         {/* EMPTY STATE */}
         {foodItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
               No food items found
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {foodItems.map((foodItem) => (
                  <div
                     key={foodItem._id}
                     className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-300"
                  >
                     {/* IMAGE */}
                     <div className="w-full flex items-center justify-center overflow-hidden rounded-md">
                        <img
                           src={foodItem.image}
                           alt={foodItem.name}
                           className="transition-transform duration-300 hover:scale-95 h-60 w-full object-cover"
                        />
                     </div>


                     {/* CONTENT */}
                     <div className="p-3 flex flex-col gap-2">
                        <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                           {foodItem.name}
                        </h2>

                        <p className="text-sm text-orange-600 font-semibold">
                           ₹ {foodItem.price}
                        </p>

                        {/* ACTIONS */}
                        <div className="mt-2 flex justify-end">
                           <button
                              onClick={() => handleDelete(foodItem._id)}
                              className="
                      text-xs sm:text-sm
                      px-3 py-1.5
                      rounded-md
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      transition
                    "
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};
