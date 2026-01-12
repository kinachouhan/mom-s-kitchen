
import express from "express";
import {
  sendOtp,
  verifyOtp,
  resendOtp,
  signup,
  login
} from "../controllers/userController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/signup", signup);
router.post("/login", login)


export default router;
