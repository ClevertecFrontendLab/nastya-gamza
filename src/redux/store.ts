import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import {registrationReducer} from "@redux/auth/registration/registration-slice.ts";

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        registration: registrationReducer,
        router: routerReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
