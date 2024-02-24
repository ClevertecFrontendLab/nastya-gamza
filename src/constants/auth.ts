export interface LoginResponse {
    accessToken: string
}
export interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterRequest {
    email: string;
    password: string;
    'confirm-password': string;
}
