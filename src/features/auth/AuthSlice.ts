import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDTO } from "./dto/LoginResponseDTO";
import type { LoginRequestDTO } from "./dto/LoginRequestDTO";
import type { AppThunk } from "../../app/store";
import i18n from "../../i18n/i18n";
import { notification } from "antd";
import { getErrorMessage } from "../../utils/errorUtil";
import { useAuthService } from "./AuthService";

interface AuthState {
  user: UserDTO | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
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
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logout,
  setAuthStatus,
  setAuthError,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;

export const loginThunk = (payload: LoginRequestDTO): AppThunk => async (dispatch) => {
  const { t } = i18n;
  dispatch(setAuthStatus("loading"));
  try {
    const { loginUser } = useAuthService(t);
    const { access_token, user } = await loginUser(payload);
    dispatch(loginSuccess({ user, token: access_token }));
  } catch (err: any) {
    dispatch(setAuthStatus("failed"));
    notification.error({
      message: t("login.failedTitle"),
      description: getErrorMessage(err, t),
      placement: "topLeft",
    });
  }
};