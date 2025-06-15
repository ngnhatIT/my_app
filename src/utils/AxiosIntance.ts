// src/api/axiosInstance.ts
import axios from "axios";
import { notification } from "antd";
import i18n from "../i18n/i18n";
import { logout } from "../features/auth/AuthSlice";
import { store } from "../app/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      notification.error({
        message: i18n.t("network.errorTitle"),
        description: i18n.t("network.unreachable"),
        placement: "topRight",
      });
      return Promise.reject(error);
    }

    if (response.status === 401) {
      notification.error({
        message: i18n.t("auth.sessionExpired"),
        description: i18n.t("auth.pleaseLoginAgain"),
        placement: "topRight",
      });
      store.dispatch(logout());
      window.location.href = "/auth/login";
    } else if (response.status === 403) {
      notification.warning({
        message: i18n.t("error.forbidden"),
        description: i18n.t("error.noPermission"),
        placement: "topRight",
      });
    } else if (response.status === 404) {
      notification.error({
        message: i18n.t("error.notFound"),
        description: i18n.t("error.resourceMissing"),
        placement: "topRight",
      });
    } else if (response.status >= 500) {
      notification.error({
        message: i18n.t("error.serverError"),
        description: i18n.t("error.tryAgainLater"),
        placement: "topRight",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
