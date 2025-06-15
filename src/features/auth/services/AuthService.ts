
import axios from "axios";
import { useFakeApi } from "../../../hooks/useFakeApi";
import type { LoginRequestDTO } from "../dto/LoginRequestDTO";
import type { LoginResponseDTO } from "../dto/LoginResponseDTO";
import type { RegisterRequestDTO } from "../dto/RegisterRequestDTO";
import type { RegisterResponseDTO } from "../dto/RegisterResponseDTO";

export const useAuthService = () => {
  const { login } = useFakeApi("users");

  const loginUser = async (payload: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const res = await login(payload);
    return res;
  };

  const registerUser = async (
    data: RegisterRequestDTO
  ): Promise<RegisterResponseDTO> => {
    const res = await axios.post("/api/register", data);
    return res.data;
  };

  const verifyOtp = async (data: VerifyOtpRequestDTO): Promise<{ success: boolean }> => {
    const res = await axios.post("/api/verify-otp", data);
    return res.data;
  };

  return { loginUser,registerUser,verifyOtp };
};