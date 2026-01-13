import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../redux/authSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_URL;
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password } = form;

    if (!name || !phone || !email || !password) return toast.error("All fields are required");

    try {
      if (email === ADMIN_EMAIL) {
        const res = await fetch(`${API}/api/v1/user/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, phone, email, password }),
        });

        const data = await res.json();
        if (!res.ok) return toast.error(data.message || "Signup failed");

        toast.success("Admin account created successfully 🎉");
        return navigate("/admin");
      }

      const res = await fetch(`${API}/api/v1/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Signup failed");

      toast.success("OTP sent! Check your email ✉️");

      dispatch(setSignupData({ name, phone, email, password }));
      navigate("/verify-otp");
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Account</h2>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <input type="tel" name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} maxLength="10" className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <button type="submit" disabled={loading} className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
          {loading ? "Processing..." : "Signup"}
        </button>
        <p className="text-sm text-center text-gray-500">
          Already have an account? <span onClick={() => navigate("/login")} className="text-orange-500 cursor-pointer hover:underline">Login</span>
        </p>
      </form>
    </div>
  );
};
