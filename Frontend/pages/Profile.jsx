import { useState, useEffect } from "react";
import { BsCloud } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export const Profile = () => {


   const { user, isAuthenticated } = useSelector((state) => state.auth);


   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
   });


   useEffect(() => {
      if (user) {
         setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
         });
      }
   }, [user]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleUpdate = (e) => {
      e.preventDefault();
      toast.success("Profile updated successfully!");
   };

   if (!isAuthenticated) {
      return (
         <div className="text-center py-20 text-gray-700">
            Please login to view your profile.
         </div>
      );
   }

   return (
      <section className="max-w-4xl mx-auto px-4 py-16">
         {/* Header */}
         <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="relative">
                  <BsCloud className="text-orange-400 text-6xl md:text-7xl" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                     Mom’s
                  </span>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Kitchen</h1>
            </div>
            <p className="text-gray-600 text-base md:text-lg">
               Manage your profile and delivery information.
            </p>
         </div>

         {/* Profile Form */}
         <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

            {/* Name & Email */}
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
               </div>

               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     readOnly
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
               </div>
            </div>

            {/* Delivery Info */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Delivery Information</h3>
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                  <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
               </div>
               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Address</label>
                  <input
                     type="text"
                     name="address"
                     value={formData.address}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
               </div>
            </div>

            <button
               type="submit"
               className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
               Update Profile
            </button>
         </form>
      </section>
   );
};
