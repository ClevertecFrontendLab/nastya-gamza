import {Outlet, useNavigate} from 'react-router-dom';
import {Layout} from 'antd';
import styles from './auth-layout.module.less'
import {useEffect} from "react";
import {PATHS} from "@constants/paths.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {authSelector} from "@redux/selectors/selectors.ts";

export const AuthLayout = () => {
    const navigate = useNavigate();
    const {token} = useAppSelector(authSelector);

    useEffect(() => {
        if (token) {
            navigate(PATHS.main, {replace: true});
        }
    }, [navigate, token]);

    return (
        <Layout className={styles.layout}>
            <Outlet/>
        </Layout>
    )
}
