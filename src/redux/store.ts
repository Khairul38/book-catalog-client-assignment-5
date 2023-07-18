import { configureStore } from "@reduxjs/toolkit";
// import logger from "./middlewares/logger";
// import cartReducer from "./features/wishlist/wishlistSlice";
import bookReducer from "./features/book/bookSlice";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
import authSliceReducer from "./features/auth/authSlice";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    book: bookReducer,
    // cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
