import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDTO } from "./dto/LoginResponseDTO";

interface AuthState {
  user: UserDTO | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  isAuthenticated: false,
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
    },
    registerSuccess(state, action: PayloadAction<{ user: UserDTO; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.isAuthenticated = false;
      sessionStorage.removeItem("access_token");
    },
    setAuthStatus(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
    },
  },
});

export const { loginSuccess, registerSuccess, logout, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;