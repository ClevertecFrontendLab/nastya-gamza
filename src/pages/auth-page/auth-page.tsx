import {useNavigate} from "react-router-dom";
import {Card, Tabs} from 'antd';
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";
import {PATHS} from "@constants/paths.ts";
import Logo from '@public/icons/logo.svg?react';
import styles from './auth-page.module.less';

interface ActiveTab {
    activeTab: 'login' | 'register';
}

export const AuthPage = ({activeTab = 'register'}: ActiveTab) => {
    const navigate = useNavigate();

    const handleActiveTab = (tab: string) => {
        tab === 'login' ? navigate(PATHS.auth) : navigate(PATHS.register);
    }

    const items = [
        {label: 'Вход', key: 'login', children: <AuthForm/>},
        {label: 'Регистрация', key: 'register', children: <RegisterForm/>},
    ];

    return (
        <Card className={styles.formContainer}>
            <Logo className={styles.logo}/>
            <Tabs
                items={items}
                activeKey={activeTab}
                onChange={handleActiveTab}
                className={styles.tabs}
            />
        </Card>
    );
};
