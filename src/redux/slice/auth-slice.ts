import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RegisterRequest} from "@constants/auth.ts";

interface AuthState {
    credentials: RegisterRequest;
    retry: boolean;
    retryEmail: boolean;
    token: string | null;
    email: string;
    loading: boolean;
}

const initialState: AuthState = {
    credentials: {email: '', password: '', "confirm-password": ''},
    retry: false,
    retryEmail: false,
    token: null,
    email: '',
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
        logout: state => {
            state.token = null;
        }
    },
})

export const {setCredentials, setToken, setLoading, setEmail, logout} = slice.actions

export default slice.reducer

