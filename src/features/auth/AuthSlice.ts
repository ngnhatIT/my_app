import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDTO } from "./dto/LoginResponseDTO";

interface AuthState {
  user: UserDTO | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed" | "verifying-otp" | "resetting-password";
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: UserDTO; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ user: UserDTO; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem("access_token");
    },
    setAuthStatus(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
      if (action.payload === "succeeded" || action.payload === "idle") {
        state.error = null;
      }
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = "failed";
    },
    clearError(state) {
      state.error = null;
    },
    startOtpVerification(state) {
      state.status = "verifying-otp";
      state.error = null;
    },
    startPasswordReset(state) {
      state.status = "resetting-password";
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logout,
  setAuthStatus,
  setAuthError,
  clearError,
  startOtpVerification,
  startPasswordReset,
} = authSlice.actions;
export default authSlice.reducer;