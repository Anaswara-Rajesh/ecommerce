import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import variantReducer from './variantSlice';
import { thunk } from 'redux-thunk'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    variants: variantReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
