import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { login } from "../redux/authSlice.js"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/authSlice";

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formdetails, setFormdetails] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formdetails;

        if (!email || !password) {
            toast.error("Email & Password required");
            return;
        }

        try {
            const response = await dispatch(login(formdetails)).unwrap();
            if (response.isAdmin) {
                navigate("/admin");
                toast.success("Logged in successfully 🎉");
            } else {
                dispatch(loginSuccess(response.user)); 
                navigate("/");
                toast.success("Logged in successfully 🎉");
            }
        } catch (err) {
            toast.error(err || "Invalid credentials");
        }
    };



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
                    value={formdetails.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none "
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formdetails.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none "
                />

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-500">
                    Doesn't have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="text-orange-500 cursor-pointer hover:underline">
                        Signup
                    </span>
                </p>
            </form>
        </div>
    );
};
