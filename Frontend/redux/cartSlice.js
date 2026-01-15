import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const API = import.meta.env.VITE_API_URL;

const initialState = {
    items: [],
    loading: false,
    error: null
}

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (item, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/cart/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(item)
            })

            const result = await res.json()

            if (!res.ok) {
                return rejectWithValue(result.message)
            }

            return result.cart.items
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (foodItemId, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ foodItemId })
            })

            const result = await res.json()

            if (!res.ok) {
                return rejectWithValue(result.message)
            }

            // return updated cart items
            return result.responseData.items

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/cart/clear`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

            dispatch(getMyCart());
            return [];
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


export const getMyCart = createAsyncThunk(
    "cart/getMyCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API}/api/v1/cart`, {
                credentials: "include"
            })

            const result = await res.json()

            if (!res.ok) {
                return rejectWithValue(result.message)
            }

            return result.responseData.items || []

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)




const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false,
                    state.items = action.payload
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(clearCart.pending, (state) => {
                state.loading = true
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false
                state.items = action.payload
            })

            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getMyCart.pending, (state) => {
                state.loading = true
            })

            .addCase(getMyCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })

            .addCase(getMyCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }


})


export default cartSlice.reducer