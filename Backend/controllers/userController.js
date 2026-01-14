import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/userModel.js";
import { OtpVerification } from "../models/otpVerificationModel.js";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



export const sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"Mom's Kitchen" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to} ✅`);
  } catch (err) {
    console.error("Email error ❌", err);
    throw err;
  }
};




export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpVerification.findOneAndUpdate(
      { email },
      { otp, expiresAt: Date.now() + 10 * 60 * 1000 },
      { upsert: true }
    );

    await sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`,
    });


    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OtpVerification.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await OtpVerification.deleteOne({ email });

    res.json({ success: true, message: "Email verified" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpVerification.findOneAndUpdate(
      { email },
      { otp, expiresAt: Date.now() + 10 * 60 * 1000 },
      { upsert: true }
    );

    await sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`,
    });


    res.json({ success: true, message: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Assign role only if email matches ADMIN_EMAIL
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      isAdmin: role === "admin",
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      isAdmin: user.role === "admin",
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    },
  });
};



export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in prod
      sameSite: "lax", // works for localhost
      expires: new Date(0), // immediately expires
    })
    .json({ success: true, message: "Logged out successfully" });
};
