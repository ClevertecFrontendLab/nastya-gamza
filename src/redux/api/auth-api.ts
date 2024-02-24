import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {push} from "redux-first-history";
import {RootState} from "@redux/store.ts";
import {setCredentials, setToken} from "@redux/slice/auth-slice.ts";
import {PATHS} from "@constants/paths.ts";
import {BASE_API_URL} from "@constants/api.ts";
import {LoginRequest, LoginResponse, RegisterRequest} from "@constants/auth.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: PATHS.login,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    if (arg.remember) {
                        localStorage.setItem('token', data.accessToken);
                    }
                    dispatch(setToken({token: data.accessToken}));
                } catch (e) {
                    dispatch(push(PATHS.resultErrorLogin));
                }
            }
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: PATHS.register,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(push(PATHS.resultSuccess));
                    dispatch(setCredentials({credentials: arg, retry: false}));
                } catch (e) {
                    if (e.error.status === 409) {
                        dispatch(push(PATHS.resultErrorUserExist));
                        return;
                    }
                    dispatch(push(PATHS.resultErrorRegister));
                    dispatch(setCredentials({credentials: arg, retry: true}));
                }
            }
        }),
        checkEmail: builder.mutation<{ email: string; message: string }, LoginRequest['email']>({
            query: (email) => ({
                url: PATHS.checkEmail,
                method: 'POST',
                body: {email},
            }),
        }),
        confirmEmail: builder.mutation<void, { email: string; code: string }>({
            query: (arg) => ({
                url: '/confirm-email',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
} = authApi;
