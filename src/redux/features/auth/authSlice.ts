import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export interface IAuthState {
  accessToken: string | undefined;
  user:
    | {
        _id?: string;
        name: {
          firstName: string;
          lastName: string;
        };
        email: string;
        role: string;
      }
    | undefined;
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
      state.accessToken = action.payload;

      state.user = jwt_decode(action.payload);
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
