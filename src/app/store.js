import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import { authApi } from "../features/user/authApi";
import { userApi } from '../features/user/userApi';
export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware])
});
