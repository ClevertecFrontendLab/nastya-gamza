import {Route, Routes} from 'react-router-dom';
import {PATHES} from "@constants/pathes.ts";
import {PageLayout} from "@components/layout";
import {MainPage} from "@pages/main-page";
import {AuthPage} from "@pages/auth-page";
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";
import {REGISTRATION_STATUS} from "@constants/auth-statuses.tsx";
import {ResultPage} from "@pages/result-page/result-page.tsx";

export const routes = (
    <Routes>
        <Route element={<AuthPage/>}>
            <Route path={PATHES.auth} element={<AuthForm/>}/>
            <Route path={PATHES.registration} element={<RegisterForm/>}/>
            <Route path={PATHES.recovery} element={''}/>
        </Route>
        <Route path={PATHES.resultSuccess}
               element={<ResultPage icon={REGISTRATION_STATUS.success.icon}
                                    title={REGISTRATION_STATUS.success.title}
                                    btnText={REGISTRATION_STATUS.success.buttonText}
                                    description={REGISTRATION_STATUS.success.description}
                                    path={REGISTRATION_STATUS.success.path}/>}/>
        <Route path={PATHES.main} element={<PageLayout/>}>
            <Route index element={<MainPage/>}/>
        </Route>
    </Routes>
)
