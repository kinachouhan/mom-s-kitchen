import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchMe } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [formdetails, setFormdetails] = useState({ email: "", password: "" });



  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) navigate("/admin");
      else navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(formdetails)).unwrap();
      await dispatch(fetchMe()).unwrap();

      toast.success("Logged in successfully 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <input type="email" name="email" placeholder="Email Address" value={formdetails.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <input type="password" name="password" placeholder="Password" value={formdetails.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none" />
        <button type="submit" disabled={loading} className={`cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center text-gray-500">
          Doesn't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-orange-500 cursor-pointer hover:underline">Signup</span>
        </p>
      </form>
    </div>
  );
};
