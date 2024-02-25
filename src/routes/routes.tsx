import {Navigate, Route, Routes} from 'react-router-dom';
import {MainPage} from '@pages/main-page';
import {AuthPage} from '@pages/auth-page';
import {ResultPage} from '@pages/result-page/result-page.tsx';
import {PageLayout} from '@components/layout';
import {AuthLayout} from '@components/layout/auth-layout/auth-layout.tsx';
import {ProtectedRoute} from './protected-route.tsx';
import {ConfirmEmail} from "@pages/confirm-email/confirm-email.tsx";
import {ChangePassword} from "@pages/change-password/change-password.tsx";
import {PATHS} from '@constants/paths.ts';

export const routes = (
    <Routes>
        <Route path={PATHS.root} element={<Navigate to={PATHS.main} />} />

        <Route element={<AuthLayout/>}>
            <Route path={PATHS.auth} element={<AuthPage activeTab={'login'}/>}/>
            <Route path={PATHS.register} element={<AuthPage activeTab={'register'}/>}/>
            <Route path={PATHS.recovery} element={''}/>
            <Route path={PATHS.result + '/:type'} element={<ResultPage/>} />
            <Route path={PATHS.confirmEmail} element={<ConfirmEmail />} />
            <Route path={PATHS.changePassword} element={<ChangePassword />} />
        </Route>

        <Route element={<ProtectedRoute/>}>
            <Route path={PATHS.main} element={<PageLayout/>}>
                <Route index element={<MainPage/>}/>
            </Route>
        </Route>
    </Routes>
)
