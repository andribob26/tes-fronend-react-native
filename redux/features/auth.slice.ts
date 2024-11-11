import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store/store";
import { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/redux/apis/auth.api";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: LoginResponse }>) => {
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const getAuthToken = (state: RootState) => state.auth.token;
export const getAuthIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
