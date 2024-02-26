import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ChangePasswordRequest, RegisterRequest} from "@constants/auth.ts";

interface AuthState {
    credentials: RegisterRequest;
    retry: boolean;
    retryEmail: boolean;
    retryPassword: boolean;
    token: string | null;
    email: string;
    password: ChangePasswordRequest;
    loading: boolean;
}

const initialState: AuthState = {
    credentials: {email: '', password: '', "confirm-password": ''},
    retry: false,
    retryEmail: false,
    retryPassword: false,
    token: null,
    email: '',
    password: {password: '', confirmPassword: ''},
    loading: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{credentials: RegisterRequest, retry: boolean}>) => {
            state.credentials = action.payload.credentials;
            state.retry = action.payload.retry;
        },
        setToken: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token;
        },
        setLoading: (state, action: PayloadAction<{loading: boolean}>) => {
            state.loading = action.payload.loading;
        },
        setEmail: (state, action: PayloadAction<{ email: string, retryEmail: boolean }>) => {
            state.email = action.payload.email;
            state.retryEmail = action.payload.retryEmail;
        },
        setPassword: (state, action: PayloadAction<{password: ChangePasswordRequest, retryPassword: boolean }>) => {
            state.password = action.payload.password;
            state.retryPassword = action.payload.retryPassword;
        },
        logout: state => {
            state.token = null;
        }
    },
})

export const {setCredentials, setToken, setLoading, setEmail, setPassword, logout} = slice.actions

export default slice.reducer

