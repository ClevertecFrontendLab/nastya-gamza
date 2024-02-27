import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Result} from 'antd';
import VerificationInput from 'react-verification-input';
import clsn from 'classnames';
import {useConfirmEmailMutation} from '@redux/api/auth-api.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Loader} from '@components/loader';
import {PATHS} from '@constants/paths.ts';
import styles from './confirm-email.module.less'

export const ConfirmEmail = () => {
    const navigate = useNavigate();
    const [confirmEmail, {isLoading, isError}] = useConfirmEmailMutation();
    const [code, setCode] = useState('');
    const errorRef = useRef(isError);
    const {email} = useAppSelector(authSelector);

    const handleComplete = async (code: string) => {
        try {
            await confirmEmail({email, code}).unwrap();
            navigate(PATHS.changePassword, {state: {from: 'redirect'}});
        } catch (e) {
            errorRef.current = true;
        } finally {
            setCode('');
        }
    };

    if (isLoading) return <Loader/>;

    return (
        <Card className={styles.card}>
            <Result className={styles.result}
                    status={errorRef.current ? 'error' : 'info'}
                    title={
                        <div>
                            {errorRef.current ? 'Неверный код. ' : ''}
                            Введите код <br/> для восстановления аккаунта
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
                    character: clsn(
                        'ant-input',
                        errorRef.current && 'ant-input-status-error',
                        styles.input,
                    ),
                }}
            />
            <p className={styles.note}>Не пришло письмо? Проверьте папку Спам.</p>
        </Card>
    );
};
