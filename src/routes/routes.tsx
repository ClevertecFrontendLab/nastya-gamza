import {Route, Routes} from 'react-router-dom';
import {MainPage} from '@pages/main-page';
import {AuthPage} from '@pages/auth-page';
import {ResultPage} from '@pages/result-page/result-page.tsx';
import {PageLayout} from '@components/layout';
import {AuthLayout} from '@components/layout/auth-layout/auth-layout.tsx';
import {ProtectedRoute} from './protected-route.tsx';
import {PATHS} from '@constants/paths.ts';

export const routes = (
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path={PATHS.auth} element={<AuthPage activeTab={'login'}/>}/>
            <Route path={PATHS.register} element={<AuthPage activeTab={'register'}/>}/>
            <Route path={PATHS.recovery} element={''}/>
            <Route path='/result/:type' element={<ResultPage/>} />
        </Route>
        <Route element={<ProtectedRoute/>}>
            <Route path={PATHS.main} element={<PageLayout/>}>
                <Route index element={<MainPage/>}/>
            </Route>
        </Route>
    </Routes>
)
