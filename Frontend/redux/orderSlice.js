import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_URL;

const initialState = {
    orders: [],
    loading: false,
    error: null,
};


export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(orderData),
            });

            const data = await res.json();

            if (!data.success) {
                return rejectWithValue(data.message);
            }

            return data.responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getUserOrders = createAsyncThunk(
    "order/getUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/order/my-orders`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!data.suucess && !data.success) {
                return rejectWithValue(data.message);
            }

            return data.responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/order`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                return rejectWithValue(data.message || "Failed to fetch orders");
            }

            return data.responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/order/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                return rejectWithValue(data.message || "Failed to update order");
            }

            return data.responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                // Update the order in the orders array
                state.orders = state.orders.map((order) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

export default orderSlice.reducer;
