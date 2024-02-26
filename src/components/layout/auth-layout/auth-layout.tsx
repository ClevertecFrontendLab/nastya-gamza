import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {Layout} from 'antd';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PATHS} from '@constants/paths.ts';
import styles from './auth-layout.module.less'

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
