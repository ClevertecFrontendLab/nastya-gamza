import {Card, Result} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {PATHS} from "@constants/paths.ts";
import styles from './confirm-email.module.less'
import VerificationInput from "react-verification-input";
import {useConfirmEmailMutation} from "@redux/api/auth-api.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {authSelector} from "@redux/selectors/selectors.ts";

export const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [confirmEmail, {isError}] = useConfirmEmailMutation();
    const [code, setCode] = useState('');
    const errorRef = useRef(isError);
    const {email} = useAppSelector(authSelector);

    const handleComplete = async (code: string) => {
        setCode('');
        try {
            await confirmEmail({email, code}).unwrap();
            navigate(PATHS.changePassword, { state: { from: 'redirect' } })
        } catch (e) {
            errorRef.current = true;
        }
    };

    useEffect(() => {
        const state = location.state;

        if (state?.from !== 'redirect' && localStorage.getItem('token')) {
            navigate(PATHS.main);
            return;
        }

        if (state?.from !== 'redirect') {
            navigate(PATHS.auth);
        }
    }, []);

    return (
        <Card className={styles.card}>
            <Result className={styles.result}
                    status={errorRef.current ? 'error' : 'info'}
                    title={
                        <div>
                            {errorRef.current ? 'Неверный код. ' : ''}
                            Введите код<br/>для восстановления аккаунта
                        </div>
                    }
                    subTitle={
                        <div>
                            Мы отправили вам на e-mail <span
                            className={styles.email}>{email}</span> шестизначный код. Введите
                            его в поле ниже.
                        </div>
                    }
            />
            <VerificationInput
                placeholder=''
                validChars='0-9'
                value={code}
                onChange={setCode}
                onComplete={handleComplete}
                inputProps={{'data-test-id': 'verification-input'}}
                classNames={{
                    container: styles.wrapper,
                    character: styles.input,
                }}
            />
            <p className={styles.note}>Не пришло письмо? Проверьте папку Спам.</p>

        </Card>
    );
};
