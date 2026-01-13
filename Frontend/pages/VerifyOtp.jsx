import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp, signupUser, fetchMe } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupFormData, loading } = useSelector((state) => state.auth);
  console.log(signupFormData)
  const [otp, setOtp] = useState(new Array(6).fill(""));


  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };


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

      // 🔑 wait for auth cookie to be read
      await dispatch(fetchMe()).unwrap();

      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || err || "Verification failed");
    }
  };



  const handleResend = () => dispatch(resendOtp(signupFormData.email));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-6 rounded-lg shadow-md text-center space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800">Verify OTP</h1>
        <p className="text-gray-500 text-sm">
          Please enter the 6-digit OTP sent to your <span className="font-medium text-gray-800">{signupFormData?.email}</span>
        </p>
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e.target.value, index)} className="w-10 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
          ))}
        </div>
        <button type="submit" disabled={loading} className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <p className="text-sm text-gray-500">
          Didn’t receive OTP?{" "}
          <span onClick={handleResend} className="text-orange-500 cursor-pointer hover:underline">Resend</span>
        </p>
      </form>
    </div>
  );
};
