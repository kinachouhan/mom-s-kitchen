import { useState } from "react";
import toast from "react-hot-toast";

export const AdminAddFooditems = () => {
   const API = import.meta.env.VITE_API_URL;

   const [loading, setLoading] = useState(false);
   const [foodItemDetails, setFoodItemDetails] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      subCategory: "",
   });

   const [image, setImage] = useState(null);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setImage(file);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFoodItemDetails((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleAddFoodItem = async () => {
      try {
         if (!image) {
            toast.error("Please upload image");
            return;
         }

         if (
            !foodItemDetails.name ||
            !foodItemDetails.description ||
            !foodItemDetails.price ||
            !foodItemDetails.category ||
            !foodItemDetails.subCategory
         ) {
            toast.error("All fields are required");
            return;
         }

         const formData = new FormData();
         formData.append("name", foodItemDetails.name);
         formData.append("description", foodItemDetails.description);
         formData.append("price", foodItemDetails.price);
         formData.append("category", foodItemDetails.category);
         formData.append("subCategory", foodItemDetails.subCategory);
         formData.append("image", image);

         setLoading(true);

         const res = await fetch(`${API}/api/v1/food-item/create`, {
            method: "POST",
            credentials: "include",
            body: formData,
         });

         const data = await res.json();

         if (data.success) {
            toast.success("Product Added!");
            setFoodItemDetails({
               name: "",
               description: "",
               price: "",
               category: "",
               subCategory: "",
            });
            setImage(null);
         } else {
            toast.error(data.message || "Failed to add product");
         }
      } catch (error) {
         toast.error("Something went wrong");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 px-3 sm:px-4 md:px-8 py-6 w-full" >
         <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
            {/* TITLE */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-6">
               Add Food Item
            </h1>

            {/* IMAGE UPLOAD */}
            <div className="mb-6">
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Food Image
               </label>

               <label
                  htmlFor="image"
                  className="relative flex items-center justify-center 
            border-2 border-dashed border-orange-300 
            rounded-lg h-36 sm:h-40 md:h-44 
            cursor-pointer overflow-hidden"
               >
                  {image ? (
                     <img
                        src={URL.createObjectURL(image)}
                        alt="Food"
                        className="w-full h-full object-contain"
                     />
                  ) : (
                     <span className="text-gray-400 text-sm">
                        Click to upload image
                     </span>
                  )}
               </label>

               <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
               />
            </div>

            {/* NAME & DESCRIPTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={foodItemDetails.name}
                     onChange={handleChange}
                     placeholder="Enter food item name"
                     className="w-full border rounded-lg px-3 py-2.5 
              text-sm sm:text-base focus:outline-none"
                  />
               </div>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                     Description
                  </label>
                  <input
                     type="text"
                     name="description"
                     value={foodItemDetails.description}
                     onChange={handleChange}
                     placeholder="Enter description"
                     className="w-full border rounded-lg px-3 py-2.5 
              text-sm sm:text-base focus:outline-none"
                  />
               </div>
            </div>

            {/* CATEGORY & SUBCATEGORY */}
            <div className="grid grid-cols-2 gap-3 mb-6 px-5 border border-gray-600 py-3 rounded-sm">
               {/* CATEGORY */}
               <div className="w-full">
                  <label className="block text-[11px] sm:text-sm font-semibold text-gray-700 mb-1">
                     Category
                  </label>

                  <select
                     name="category"
                     value={foodItemDetails.category}
                     onChange={handleChange}
                     className="block w-full border rounded-md
      px-2 py-1.5
      text-[11px] sm:text-sm
      min-h-[36px] sm:min-h-[44px]
      bg-white focus:outline-none"
                  >
                     <option value="">Category</option>
                     <option value="Veg">Veg</option>
                     <option value="Non-veg">Non-veg</option>
                  </select>
               </div>

               {/* SUB CATEGORY */}
               <div className="w-full">
                  <label className="block text-[11px] sm:text-sm font-semibold text-gray-700 mb-1">
                     Sub Category
                  </label>

                  <select
                     name="subCategory"
                     value={foodItemDetails.subCategory}
                     onChange={handleChange}
                     className="block w-full border rounded-md
      px-2 py-1.5
      text-[11px] sm:text-sm
      min-h-[36px] sm:min-h-[44px]
      bg-white focus:outline-none"
                  >
                     <option value="">Sub</option>
                     <option value="Breakfast">Breakfast</option>
                     <option value="Lunch">Lunch</option>
                     <option value="Dinner">Dinner</option>
                     <option value="Today's Special">Today's Special</option>
                  </select>
               </div>
            </div>


            {/* PRICE */}
            <div className="mb-6">
               <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price
               </label>
               <input
                  type="number"
                  name="price"
                  value={foodItemDetails.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border rounded-lg px-3 py-2.5 
            text-sm sm:text-base focus:outline-none"
               />
            </div>

            {/* BUTTON */}
            <button
               onClick={handleAddFoodItem}
               disabled={loading}
               className="w-full bg-orange-500 text-white font-semibold 
          py-3 rounded-lg hover:bg-orange-600 transition 
          text-sm sm:text-base disabled:opacity-60"
            >
               {loading ? "Adding..." : "Add Food Item"}
            </button>
         </div>
      </div>
   );
};
