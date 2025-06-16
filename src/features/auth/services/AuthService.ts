
import axiosInstance from "../../../api/AxiosIntance";
import { handleAxiosError } from "../../../api/handleAxiosError";
import type { LoginRequestDTO } from "../dto/LoginRequestDTO";
import type { LoginResponseDTO } from "../dto/LoginResponseDTO";
import type { RegisterRequestDTO } from "../dto/RegisterRequestDTO";
import type { RegisterResponseDTO } from "../dto/RegisterResponseDTO";

interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
}

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

  const verifyOtp = async (data: VerifyOtpRequestDTO): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.post<{ success: boolean }>("/api/verify-otp", data);
      return res.data;
    } catch (err) {
      throw handleAxiosError(err, translate, translate("otp.failed"));
    }
  };

  return { loginUser, registerUser, verifyOtp };
};