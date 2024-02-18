import {Route, Routes} from 'react-router-dom';
import {PATHES} from "@constants/pathes.ts";
import {PageLayout} from "@components/layout";
import {MainPage} from "@pages/main-page";
import {AuthPage} from "@pages/auth-page";
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";

export const routes = (
    <Routes>
        <Route element={<AuthPage />}>
            <Route path={PATHES.auth} element={<AuthForm />} />
            <Route path={PATHES.registration} element={<RegisterForm/>} />
            <Route path={PATHES.recovery} element={''} />
        </Route>
        <Route path={PATHES.main} element={<PageLayout/>}>
            <Route index element={<MainPage/>}/>
        </Route>
    </Routes>
)
