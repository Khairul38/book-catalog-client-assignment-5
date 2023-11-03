import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface IUser {
  _id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IAuthState {
  accessToken: string | undefined;
  user: IUser | undefined;
}

const initialState: IAuthState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const user: IUser = jwt_decode(action.payload);
      if (user?.exp * 1000 > Date.now()) {
        state.accessToken = action.payload;
        state.user = user;
      } else {
        state.accessToken = undefined;
        state.user = undefined;
        localStorage.clear();
      }
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
