
import express from "express";
import {
  sendOtp,
  verifyOtp,
  resendOtp,
  signup,
  login,
  getMe
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);


export default router;
