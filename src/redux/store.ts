import { configureStore } from "@reduxjs/toolkit";
// import logger from "./middlewares/logger";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import { api } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
