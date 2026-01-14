import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchMe } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [formDetails, setFormDetails] = useState({ email: "", password: "" });

  // Fetch user on mount (for refresh)
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // Navigate when auth state is ready
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // login first
      await dispatch(login(formDetails)).unwrap();

      // fetch user info to get role
      const loggedUser = await dispatch(fetchMe()).unwrap();

      // navigate based on role
      navigate(loggedUser.role === "admin" ? "/admin" : "/");
      toast.success("Logged in successfully 🎉");
    } catch (err) {
      toast.error(err || "Invalid credentials");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formDetails.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formDetails.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
