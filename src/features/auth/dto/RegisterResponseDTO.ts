export interface RegisterResponseDTO {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  message?: string;
}

export interface RegisterOTPResponseDTO{
    user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  access_token : string;
}