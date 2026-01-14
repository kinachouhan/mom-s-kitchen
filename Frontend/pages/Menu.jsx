import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { fetchAllFoodItems } from "../redux/fooditemSlice";

export const Menu = () => {
   const [selectedCategory, setSelectedCategory] = useState("");

   const [selectedSubCategory, setSelectedSubCategory] = useState("");

   const [searchTerm, setSearchTerm] = useState("");
   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { isAuthenticated } = useSelector((state) => state.auth);
   const { foodItems, loading } = useSelector((state) => state.foodItems);

   useEffect(() => {
      dispatch(fetchAllFoodItems());
   }, [dispatch]);

   const handleOrder = () => {
      if (isAuthenticated) navigate("/cart");
      else navigate("/login");
   };

   // Filter logic
   // Filter logic
   const filteredFood = foodItems.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory
         ? item.subCategory === selectedSubCategory
         : true;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
   });


   return (
      <section className="max-w-7xl mx-auto px-4 py-10">
         <div className="flex flex-col md:flex-row gap-8">
            {/* ================= LEFT FILTERS ================= */}
            <aside
               className={`md:w-1/4 w-full bg-white rounded-2xl shadow-sm p-6 h-fit md:sticky md:top-24 transform transition-transform duration-300 ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                  } fixed md:relative top-0 left-0 z-50`}
            >
               <div className="flex justify-between items-center mb-4 md:hidden">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                     className="text-gray-600 font-bold"
                     onClick={() => setMobileFilterOpen(false)}
                  >
                     X
                  </button>
               </div>

               <h3 className="text-lg font-semibold mb-3 hidden md:block">Filters</h3>

               <div className="space-y-4 p-3 border border-gray-300 mb-3 rounded-sm">
                  {["Veg", "Non-veg"].map((item) => (
                     <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input
                           type="radio"
                           name="category"
                           checked={selectedCategory === item}
                           onChange={() => setSelectedCategory(item)}
                           className="accent-orange-500 w-5 h-5"
                        />
                        <span className="text-gray-700">{item}</span>
                     </label>
                  ))}
               </div>

               <div className="space-y-4 p-3 border border-gray-300 rounded-sm">
                  {["Breakfast", "Lunch", "Dinner", "Today's Special"].map((item) => (
                     <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input
                           type="radio"
                           name="subCategory"
                           checked={selectedSubCategory === item}
                           onChange={() => setSelectedSubCategory(item)}
                           className="accent-orange-500 w-5 h-5"
                        />
                        <span className="text-gray-700">{item}</span>
                     </label>
                  ))}
               </div>

               <button
                  onClick={() => {
                     setSelectedCategory("");
                     setSelectedSubCategory("")
                  }}
                  className="bg-orange-500 text-white px-3 py-2 mt-5 rounded-md w-full"
               >
                  Clear Filters
               </button>
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

                  {/* Mobile filter toggle */}
                  <button
                     className="md:hidden bg-orange-500 text-white px-3 py-2 rounded-md"
                     onClick={() => setMobileFilterOpen(true)}
                  >
                     Filters
                  </button>
               </div>

               {filteredFood.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredFood.map((item) => (
                        <div
                           onClick={() => navigate(`/single-item/${item._id}`)}
                           key={item._id}
                           className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
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
