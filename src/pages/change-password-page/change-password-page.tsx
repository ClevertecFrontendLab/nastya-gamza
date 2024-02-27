import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Card, Form, Input, Typography} from 'antd';
import {useChangePasswordMutation} from '@redux/api/auth-api.ts';
import {setPassword} from '@redux/slice/auth-slice.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {isValidConfirmPassword, isValidPassword} from '@utils/validation.ts';
import {PATHS} from '@constants/paths.ts';
import {ChangePasswordRequest} from '@constants/auth.ts';
import styles from './change-password-page.module.less'

const {Title} = Typography;

export const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [changePassword] = useChangePasswordMutation();
    const {retryPassword, password} = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    const onSubmit = async (data: ChangePasswordRequest) => {
        try {
            await changePassword(data).unwrap();
            navigate(PATHS.resultSuccessChangePassword, {state: {from: 'redirect'}});
            dispatch(setPassword({password: data, retryPassword: false}));
        } catch (e) {
            navigate(PATHS.resultErrorChangePassword, {state: {from: 'redirect'}});
            dispatch(setPassword({password: data, retryPassword: true}));
        }
    }

    useEffect(() => {
        const f = async () => {
            try {
                await changePassword(password).unwrap();
                navigate(PATHS.resultSuccessChangePassword, {state: {from: 'redirect'}});
                dispatch(setPassword({password, retryPassword: false}));
            } catch (e) {
                navigate(PATHS.resultErrorChangePassword, {state: {from: 'redirect'}});
                dispatch(setPassword({password, retryPassword: true}));
            }
        }

        if (retryPassword) {
            f()
        }
    }, []);

    return (
        <Card className={styles.card}>
            <Title level={3} style={{marginBottom: '32px'}}>Восстановление аккаунта</Title>
            <Form
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item
                    name='password'
                    className={styles.password}
                    rules={[{required: true, message: ''}, {validator: isValidPassword}]}
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password data-test-id='change-password' placeholder={'Новый пароль'}/>
                </Form.Item>
                <Form.Item
                    name='confirmPassword'
                    dependencies={['password']}
                    className={styles.password}
                    rules={[{required: true, message: ''}, isValidConfirmPassword]}
                >
                    <Input.Password data-test-id='change-confirm-password'
                                    placeholder={'Повторите пароль'}/>
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    block
                    size='large'
                    className={styles.btn}
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form>
        </Card>
    )
}
