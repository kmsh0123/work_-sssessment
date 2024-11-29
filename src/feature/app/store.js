import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth/authApi';
import authSlice from '../auth/authSlice';
import { itemApi } from '../api/Item/itemApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    auth: authSlice, // Corrected here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,itemApi.middleware),
});
