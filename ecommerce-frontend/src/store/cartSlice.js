import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as addToCartAPI,
  getCartItems,
  removeCartItem as removeCartItemAPI,
  clearCart as clearCartAPI,
} from "../services/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartAPI(productId, variantId, quantity);
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      const response = await removeCartItemAPI(productId, variantId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCartAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
