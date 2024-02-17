import {Card, Tabs} from 'antd';
import Logo from '@public/icons/logo.svg?react';
import styles from './auth.module.less';
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";
import {Loader} from "@components/loader/loader.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
    // const navigate = useNavigate();
    // const { isAuthenticated } = useAppSelector(authSelector);

    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     const user = localStorage.getItem('user');
    //
    //     if (token && user && isAuthenticated) {
    //         navigate(ROUTES.main, { replace: true });
    //     }
    // }, [isAuthenticated, navigate]);
    const [key, setKey] = useState('1');
    const navigate = useNavigate();

    const handleActiveKey = (key: string) => {
        setKey(key);
        key==='1' ? navigate(`/auth`) : navigate('/auth/registration')
    }

    const items = [
        { label: 'Вход', key: '1', children: <AuthForm/> },
        { label: 'Регистрация', key: '2', children: <RegisterForm/> },
    ];

    return (
        <div className={styles.wrapper}>
            {/*<Loader/>*/}
            <Card className={styles.formContainer}>
                <div className={styles.logo}><Logo/></div>
                <Tabs
                    items={items}
                    activeKey={key}
                    onChange={handleActiveKey}
                    centered={true}
                    className={styles.tabs}
                />
            </Card>
        </div>
    );
};
