import {Card, Tabs} from 'antd';
import Logo from '@public/icons/logo.svg?react';
import styles from './auth-page.module.less';
import {AuthForm} from "@components/forms/auth-form/auth-form.tsx";
import {RegisterForm} from "@components/forms/register-form/register-form.tsx";
// import {Loader} from "@components/loader/loader.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PATHES} from "@constants/pathes.ts";

export const AuthPage = () => {
    const [key, setKey] = useState('tab-1');
    const navigate = useNavigate();

    const handleActiveKey = (key: string) => {
        setKey(key);
        key==='tab-1' ? navigate(PATHES.auth) : navigate(PATHES.registration);
    }

    const items = [
        { label: 'Вход', key: 'tab-1', children: <AuthForm/> },
        { label: 'Регистрация', key: 'tab-2', children: <RegisterForm/> },
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
                    className={styles.tabs}
                />
            </Card>
        </div>
    );
};
