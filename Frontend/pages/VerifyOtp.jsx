import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp, signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, signupFormData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.error("Please enter 6 digit OTP");
    }

    try {
      await dispatch(verifyOtp({ email, otp: finalOtp })).unwrap();

      // OTP verified → create account
      await dispatch(signupUser(signupFormData)).unwrap();

      navigate("/");
    } catch (err) {
      toast.error(err || "Invalid OTP");
    }
  };

  const handleResend = () => {
    dispatch(resendOtp(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md text-center space-y-5"
      >
        <h1 className="text-2xl font-semibold text-gray-800">
          Verify OTP
        </h1>

        <p className="text-gray-500 text-sm">
          Please enter the 6-digit OTP sent to your{" "}
          <span className="font-medium text-gray-800">{email}</span>
        </p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition"
        >
          Verify OTP
        </button>

        <p className="text-sm text-gray-500">
          Didn’t receive OTP?{" "}
          <span
            onClick={handleResend}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};
