import axios, { type AxiosResponse, AxiosError } from "axios";
import i18n from "../i18n/i18n";
import { logout } from "../features/auth/AuthSlice";
import { store } from "../app/store";
import type { NavigateFunction } from "react-router-dom";

// Biến toàn cục để lưu navigate
let navigate: NavigateFunction | null = null;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

// Interface cho response thành công
interface SuccessApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// Interface cho response lỗi
interface ErrorApiResponse {
  message: string;
  status: number;
  statusText: string;
  errors?: Array<{ field: string; message: string }>;
}

// Union type cho ApiResponse
type ApiResponse<T = any> = SuccessApiResponse<T> | ErrorApiResponse;

// Hàm kiểm tra token
const isValidToken = (token: string): boolean => {
  try {
    return token.split(".").length === 3; // Kiểm tra định dạng JWT
  } catch {
    return false;
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token && isValidToken(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = i18n.language || "en";
    return config;
  },
  (error) => Promise.reject(new Error(error?.message ?? "Request error"))
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError<ApiResponse>) => {
    const { response, code } = error;

    // Xử lý lỗi timeout
    if (code === "ECONNABORTED") {
      return Promise.reject(error);
    }

    // Xử lý lỗi mạng
    if (!response) {
      return Promise.reject(error);
    }

    // Xử lý lỗi 401: Đăng xuất và chuyển hướng
    if (response.status === 401) {
      store.dispatch(logout());
      sessionStorage.removeItem("access_token");
      if (navigate) {
        navigate("/auth/login");
      } else {
        window.location.href = "/auth/login";
      }
    }

    // Trả về lỗi để component xử lý thông báo
    return Promise.reject(error);
  }
);

export default axiosInstance;