import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateVariantById, deleteVariantById } from "../services/api";

const initialState = {
  variants: [],
};

export const createVariant = (variantData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("/variants", variantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addVariant(response.data));
  } catch (error) {
    console.error("Error creating variant:", error);
  }
};

export const updateVariant = (id, variantData) => async (dispatch) => {
  try {
    const response = await updateVariantById(id, variantData);
    dispatch(updateVariantSuccess(response.data));
  } catch (error) {
    console.error("Error updating variant:", error);
  }
};

export const deleteVariant = (id) => async (dispatch) => {
  try {
    await deleteVariantById(id);
    dispatch(deleteVariantSuccess(id));
  } catch (error) {
    console.error("Error deleting variant:", error);
  }
};

const variantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    setVariants: (state, action) => {
      state.variants = action.payload;
    },
    addVariant: (state, action) => {
      state.variants.push(action.payload);
    },
    updateVariantSuccess: (state, action) => {
      const index = state.variants.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.variants[index] = action.payload;
      }
    },
    deleteVariantSuccess: (state, action) => {
      state.variants = state.variants.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setVariants,
  addVariant,
  updateVariantSuccess,
  deleteVariantSuccess,
} = variantSlice.actions;
export default variantSlice.reducer;
