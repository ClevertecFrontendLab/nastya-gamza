import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RegisterRequest} from "@constants/auth.ts";

interface AuthState {
    credentials: RegisterRequest;
    retry: boolean;
    token: string | null;
}

const initialState: AuthState = {
    credentials: {email: '', password: '', "confirm-password": ''},
    retry: false,
    token: null,

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
        logout: state => {
            state.token = null;
        }
    },
})

export const {setCredentials, setToken, logout} = slice.actions

export default slice.reducer

