import {Route, Routes} from 'react-router-dom';
import {ROUTES} from "@constants/routes.ts";
import {PageLayout} from "@components/layout";
import {MainPage} from "@pages/main-page";
import {Auth} from "@pages/auth/auth.tsx";
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";

export const routes = (
    <Routes>
        <Route element={<Auth />}>
            <Route path={ROUTES.auth} element={<AuthForm />} />
            <Route path={ROUTES.registration} element={<RegisterForm/>} />
            <Route path={ROUTES.recovery} element={''} />
        </Route>
        <Route path={ROUTES.main} element={<PageLayout/>}>
            <Route index element={<MainPage/>}/>
        </Route>
    </Routes>
)
