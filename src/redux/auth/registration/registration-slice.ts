import { createSlice } from '@reduxjs/toolkit';
import {registrationRequest} from "@redux/auth/registration/registration-thunk.ts";

export type UserAPI = {
    userToken: string;
    password: string;
};

export type RegistrationState = {
    user: UserAPI | null;
    isLoading: boolean;
    isError: boolean;
    is400Status: boolean;
};

const initialState: RegistrationState = {
    user: null,
    isLoading: false,
    isError: false,
    is400Status: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registrationRequest.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(registrationRequest.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(registrationRequest.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const registrationReducer = registrationSlice.reducer;
