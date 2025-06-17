export interface UserRegisterDTO{
  username:string;
  email:string;
  password:string;
}

export interface VerifyOtpRequestDTO {
  user: UserRegisterDTO;
  otp: string;
}