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
    'confirm-password': string;
}

export interface ChangePassword {
    password: string;
    confirmPassword: string;
}
