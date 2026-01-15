import { useState, useEffect } from "react";
import { BsCloud } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export const Profile = () => {
   const { user, isAuthenticated } = useSelector((state) => state.auth);
   const API = import.meta.env.VITE_API_URL;

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: ""
   });

   /* ================= PREFILL USER DATA ================= */
   useEffect(() => {
  if (user) {
    setFormData({
      firstName: user.address?.firstName || "",
      lastName: user.address?.lastName || "",
      email: user.address?.email || user.email || "",
      phone: user.address?.phone || user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      zipcode: user.address?.zipcode || "",
      country: user.address?.country || "",
    });
  }
}, [user]);


   /* ================= HANDLERS ================= */
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value
      }));
   };

   const handleUpdate = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch(`${API}/api/v1/user/profile`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
               firstName: formData.firstName,
               lastName: formData.lastName,
               email: formData.email,
               phone: formData.phone,
               street: formData.street,
               city: formData.city,
               state: formData.state,
               zipcode: formData.zipcode,
               country: formData.country,
            }),
         });

         const data = await res.json();

         if (!res.ok || !data.success) {
            throw new Error(data.message || "Profile update failed");
         }

         // Backend returns only address
         setFormData((prev) => ({
            ...prev,
            ...data.responseData.address,
         }));

         toast.success("Profile updated successfully!");
      } catch (error) {
         console.error("Profile update error:", error);
         toast.error("Failed to update profile");
      }
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
         {/* HEADER */}
         <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="relative">
                  <BsCloud className="text-orange-400 text-6xl md:text-7xl" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                     Mom’s
                  </span>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Kitchen
               </h1>
            </div>
            <p className="text-gray-600 text-base md:text-lg">
               Manage your profile and delivery information.
            </p>
         </div>

         {/* FORM */}
         <form
            onSubmit={handleUpdate}
            className="bg-white p-8 rounded-2xl shadow-md space-y-6"
         >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
               Profile Information
            </h2>

            {/* FIRST & LAST NAME */}
            <div className="flex flex-col md:flex-row gap-4">
               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                     First Name
                  </label>
                  <input
                     type="text"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
               </div>

               <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                     Last Name
                  </label>
                  <input
                     type="text"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
               </div>
            </div>

            {/* EMAIL */}
            <div>
               <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
               />
            </div>

            {/* PHONE */}
            <div>
               <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Phone Number
               </label>
               <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
               />
            </div>

            {/* DELIVERY INFO */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
               Delivery Information
            </h3>

            <input
               type="text"
               name="street"
               placeholder="Street Address"
               value={formData.street}
               onChange={handleChange}
               className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-orange-500"
            />

            <div className="flex flex-col md:flex-row gap-4">
               <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
               />
               <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
               />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-3">
               <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
               />
               <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
               />
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
