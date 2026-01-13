import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

/* ================= VERIFY OTP ================= */
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
        return rejectWithValue(data.message || "Invalid OTP");
      }

      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Invalid OTP");
    }
  }
);

/* ================= SIGNUP ================= */
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
        return rejectWithValue(data.message || "Signup failed");
      }

      toast.success("Account created successfully 🎉");
      return data;
    } catch (err) {
      return rejectWithValue("Signup failed");
    }
  }
);

/* ================= LOGIN ================= */
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
        return rejectWithValue(data.message || "Login failed");
      }

      
      return data;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

/* ================= RESEND OTP ================= */
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
        return rejectWithValue(data.message || "Unable to resend OTP");
      }

      toast.success("OTP resent");
      return true;
    } catch (err) {
      return rejectWithValue("Unable to resend OTP");
    }
  }
);

/* ================= FETCH ME ================= */
export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API}/api/v1/user/me`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(null); // silent fail
    }

    return data; // { user: {...}, isAdmin: true/false }
  } catch (err) {
    return rejectWithValue("Not authenticated");
  }
});

/* ================= LOGOUT ================= */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/user/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Logout failed");

      toast.success("Logged out successfully");
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    signupFormData: null,
    isOtpVerified: false,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSignupData: (state, action) => {
      state.signupFormData = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // OTP
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
        state.error = action.payload;
      })
      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;

      })
      // FETCH ME
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;

      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setSignupData, clearError } = authSlice.actions;
export default authSlice.reducer;
