
import { handleAxiosError } from "../../api/AandleAxiosError";
import axiosInstance from "../../api/AxiosIntance";
import type { ChangePasswordDTO } from "./dto/ChangePasswordDTO";
import type { LoginRequestDTO } from "./dto/LoginRequestDTO";
import type { LoginResponseDTO } from "./dto/LoginResponseDTO";
import type { RegisterRequestDTO } from "./dto/RegisterRequestDTO";
import type { RegisterResponseDTO } from "./dto/RegisterResponseDTO";
import type { VerifyOtpRequestDTO } from "./dto/VerifyRequestDTO";

export const useAuthService = (translate: (key: string) => string) => {
  const loginUser = async (payload: LoginRequestDTO): Promise<LoginResponseDTO> => {
    try {
      const res = await axiosInstance.post<LoginResponseDTO>("/api/login", payload);
      sessionStorage.setItem("access_token", res.data.access_token);
      return res.data;
    } catch (err) {
      throw handleAxiosError(err, translate, translate("login.failed"));
    }
  };

  const registerUser = async (data: RegisterRequestDTO): Promise<RegisterResponseDTO> => {
    try {
      const res = await axiosInstance.post<RegisterResponseDTO>("/api/register", data);
      sessionStorage.setItem("access_token", res.data.access_token);
      return res.data;
    } catch (err) {
      throw handleAxiosError(err, translate, translate("register.failed"));
    }
  };

  const sendOtp = async (email: string) => {
    try {
      await axiosInstance.post("/api/send-otp", { email });
    } catch (err) {
      throw handleAxiosError(err, translate, translate("otp.failed"));
    }
  };

  const verifyOtp = async (data: VerifyOtpRequestDTO): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.post<{ success: boolean }>("/api/verify-otp", data);
      return res.data;
    } catch (err) {
      throw handleAxiosError(err, translate, translate("otp.failed"));
    }
  };

  const changePassword = async (data: ChangePasswordDTO): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.post<{ success: boolean }>("/api/change-password", data);
      return res.data;
    } catch (err) {
      throw handleAxiosError(err, translate, translate("resetPassword.failed"));
    }
  };

  return { loginUser, registerUser, verifyOtp, sendOtp, changePassword };
};