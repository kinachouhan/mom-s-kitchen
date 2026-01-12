import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

const API = import.meta.env.VITE_API_URL;


/* ---------------- VERIFY OTP ---------------- */
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : "Invalid OTP"
        );
      }

      return true;
    } catch (err) {
      const msg = err.message || "Invalid OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ---------------- SIGNUP (AFTER OTP VERIFIED) ---------------- */
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : "Signup failed"
        );
      }

      toast.success("Account created successfully 🎉");
      return data;
    } catch (err) {
      const msg = err.message || "Signup failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


//------------------Login...................//

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : "Login failed"
        );
      }
      return data;
    } catch (err) {
      const msg = err.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);


/* ---------------- RESEND OTP ---------------- */
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/user/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.message === "string"
            ? data.message
            : "Unable to resend OTP"
        );
      }

      toast.success("OTP resent");
      return true;
    } catch (err) {
      const msg = err.message || "Unable to resend OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


/* ---------------- SLICE ---------------- */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    signupFormData: null,
    isOtpVerified: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSignupData: (state, action) => {
      state.signupFormData = action.payload;
      state.email = action.payload.email;
    },
    resetAuth: (state) => {
      state.email = null;
      state.signupFormData = null;
      state.isOtpVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.isOtpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // string only
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSignupData, resetAuth } = authSlice.actions;
export default authSlice.reducer;
