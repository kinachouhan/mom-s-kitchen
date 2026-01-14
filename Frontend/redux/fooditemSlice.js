import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  foodItems: [],
  loading: false,
  error: null,
};

export const fetchAllFoodItems = createAsyncThunk(
  "foodItems/fetchAllFoodItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/v1/food-item/food-items`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch food items");
      }

      return data.responseData
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const foodItemSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoodItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFoodItems.fulfilled, (state, action) => {
        state.loading = false;
        state.foodItems = action.payload; 
      })
      .addCase(fetchAllFoodItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default foodItemSlice.reducer;
