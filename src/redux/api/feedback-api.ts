import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@redux/store.ts';
import {BASE_API_URL} from '@constants/api.ts';
// import {PATHS} from '@constants/paths.ts';

type Feedback = {
    id: string,
    fullName: string | null,
    imageSrc: string | null,
    message: string | null,
    rating: number,
    createdAt: string,
}

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const lsToken = localStorage.getItem('token');
            const token = (getState() as RootState).auth.token;

            if (lsToken || token) {
                headers.set('Authorization', `Bearer ${lsToken || token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Feedback'],
    endpoints: (build) => ({
        getFeedbacks: build.query<Feedback[], void>({
            query: () => '/feedback',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'Feedback' as const, id})),
                        {type: 'Feedback', id: 'LIST'},
                    ]
                    : [{type: 'Feedback', id: 'LIST'}],
        }),
    }),
})

export const {
    useGetFeedbacksQuery,
} = feedbackApi;