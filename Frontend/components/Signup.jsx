import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignupData } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

  const [formdetails, setFormdetails] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, number, email, password } = formdetails;

    if (!name || !number || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // ✅ Admin signup: skip OTP
      if (email === ADMIN_EMAIL) {
        const res = await fetch(`${API}/api/v1/user/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formdetails),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Signup failed");
          return;
        }

        if (data.isAdmin) {
          toast.success("Admin account created successfully 🎉");
          navigate("/admin"); // redirect to admin page
          return;
        }
      }

      // 🟢 Normal user signup: send OTP
      const res = await fetch(`${API}/api/v1/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Email already registered");
        return;
      }

      // Save form data in Redux for later OTP verification
      dispatch(setSignupData(formdetails));
      toast.success("OTP has been sent!");
      navigate("/verify-otp");
    } catch (err) {
      toast.error("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formdetails.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />

        <input
          type="tel"
          name="number"
          placeholder="Mobile Number"
          value={formdetails.number}
          onChange={handleChange}
          maxLength="10"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formdetails.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdetails.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition"
        >
          Signup
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};
