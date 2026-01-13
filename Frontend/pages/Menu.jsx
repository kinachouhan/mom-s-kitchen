import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";

const foodData = [
   {
      id: 1,
      name: "Home Style North Indian Thali",
      price: 199,
      image:
         "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/5/29/b05cd867-6caf-4dfb-a335-9fff0c182cbe_80651.jpg",
      category: "Breakfast",
   },
];

export const Menu = () => {
   const [selectedCategory, setSelectedCategory] = useState("All");
   const navigate = useNavigate();
   const { isAuthenticated } = useSelector((state) => state.auth);

   const [searchTerm, setSearchTerm] = useState("");
   const handleOrder = () => {
      if (isAuthenticated) navigate("/cart");
      else navigate("/login");
   };

   const filteredFood = foodData.filter((item) => {
      const matchCategory =
         selectedCategory === "All" || item.category === selectedCategory;

      const matchSearch = item.name
         .toLowerCase()
         .includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
   });


   return (
      <section className="max-w-7xl mx-auto px-4 py-10">
         <div className="flex flex-col md:flex-row gap-8">

            {/* ================= LEFT FILTERS ================= */}
            <aside className="md:w-1/4 w-full bg-white rounded-2xl shadow-sm p-6 h-fit md:sticky md:top-24">
               <h3 className="text-lg font-semibold mb-5 pb-3">
                  Filters
               </h3>

               <div className="space-y-4">
                  {["All", "Breakfast", "Lunch", "Dinner", "Today's Special"].map((item) => (
                     <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer group"
                     >
                        <input
                           type="radio"
                           name="category"
                           checked={selectedCategory === item}
                           onChange={() => setSelectedCategory(item)}
                           className="accent-orange-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-orange-500 transition">
                           {item}
                        </span>
                     </label>
                  ))}
               </div>
            </aside>

            {/* ================= RIGHT CONTENT ================= */}
            <div className="md:w-3/4 w-full">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                     Mom’s Kitchen Specials
                  </h2>

                  <div className="relative w-full sm:w-64">
                     <input
                        className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Search dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                     <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  </div>
               </div>

      
               {filteredFood.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredFood.map((item) => (
                        <div
                           key={item.id}
                           className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
                        >
                           <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-44 object-cover"
                           />

                           <div className="p-4 space-y-2">
                              <h3 className="font-semibold text-gray-800 line-clamp-1">
                                 {item.name}
                              </h3>

                              <p className="text-sm text-gray-500">
                                 Homemade • Fresh • Hygienic
                              </p>

                              <div className="flex items-center justify-between pt-3">
                                 <span className="font-bold text-gray-900 text-lg">
                                    ₹{item.price}
                                 </span>

                                 <button
                                    onClick={handleOrder}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm rounded-full font-medium transition"
                                 >
                                    Add
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                     <p className="text-lg font-semibold text-gray-700">
                        No products found 😔
                     </p>
                     <p className="text-sm text-gray-500 mt-2">
                        Try searching with a different keyword or category
                     </p>
                  </div>
               )}

            </div>
         </div>
      </section>

   );
};
