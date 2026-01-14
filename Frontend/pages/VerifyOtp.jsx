import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp, signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, signupFormData, loading } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [isAuthenticated, user, loading, navigate]);


  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? "/admin" : "/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signupFormData) {
      toast.error("Signup session expired");
      return navigate("/signup");
    }

    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return toast.error("Enter 6 digits");

    try {
      await dispatch(
        verifyOtp({ email: signupFormData.email, otp: finalOtp })
      ).unwrap();

      await dispatch(signupUser(signupFormData)).unwrap();

    } catch (err) {
      toast.error(err?.message || "Verification failed");
    }
  };

  const handleResend = () => {
    if (!signupFormData?.email) {
      toast.error("Signup session expired");
      return navigate("/signup");
    }
    dispatch(resendOtp(signupFormData.email));
  };

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-6 rounded-lg shadow-md text-center space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800">Verify OTP</h1>
        <p className="text-gray-500 text-sm">
          Please enter the 6-digit OTP sent to{" "}
          <span className="font-medium text-gray-800">
            {signupFormData?.email}
          </span>
        </p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ))}
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium"
        >
          {loading ? "Verifying..." : "Verify OTP"}
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
