import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Layout} from 'antd';
import styles from './auth-layout.module.less'
import {useEffect} from "react";
import {PATHS} from "@constants/paths.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {authSelector} from "@redux/selectors/selectors.ts";

export const AuthLayout = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(authSelector);
    const location = useLocation();

    useEffect(() => {
        if (auth.token) {
            navigate(PATHS.main, {replace: true});

            if (location.pathname.includes(PATHS.result)) {
                navigate(PATHS.main, {replace: true});
            }
        }
    }, [navigate, auth.token]);

    return (
        <Layout className={styles.layout}>
            <Outlet/>
        </Layout>
    )
}
