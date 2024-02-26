export interface LoginResponse {
    accessToken: string
}
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordRequest {
    password: string;
    confirmPassword: string;
}
