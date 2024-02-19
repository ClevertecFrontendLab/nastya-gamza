import {AxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthPath} from "@constants/api.ts";
import {instanceApi} from "../../../api/api.ts";
import {push} from "redux-first-history";
import {PATHES} from "@constants/pathes.ts";

export type RegistrationUserData = {
    email: string;
    password: string;
};

export const registrationRequest = createAsyncThunk(
    AuthPath.registration,
    async (user: RegistrationUserData, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await instanceApi.post(AuthPath.registration, {...user});
            dispatch(push(PATHES.resultSuccess));
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                return rejectWithValue(e.response?.status);
            }
        }

        return 500;
    }
);
