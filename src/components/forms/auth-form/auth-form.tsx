import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Checkbox, Form, Grid, Input} from 'antd';
import {isValidEmail, isValidPassword} from '@utils/validation.ts';
import {useCheckEmailMutation, useLoginMutation} from '@redux/api/auth-api.ts';
import {setEmail, setToken} from '@redux/slice/auth-slice.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Loader} from '@components/loader';
import {PATHS} from '@constants/paths.ts';
import {GooglePlusOutlined} from '@ant-design/icons';
import styles from './auth-form.module.less';

const {useBreakpoint} = Grid;

export interface FormFields {
    email: string;
    password: string;
    remember: boolean;
}

export const AuthForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const auth = useAppSelector(authSelector);

    const onSubmit = async (data: FormFields) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // иначе 1ый тест не находит Loader
            const response = await login({email: data.email, password: data.password}).unwrap();
            navigate(PATHS.main, {state: {from: 'redirect'}});

            if (data.remember) {
                localStorage.setItem('token', response.accessToken);
            }

            dispatch(setToken({token: response.accessToken}));
        } catch (e) {
            navigate(PATHS.resultErrorLogin, {state: {from: 'redirect'}});
        }
    }

    const validateEmail = () => {
        const isValid = form.isFieldTouched('email') && form.getFieldError('email').length === 0;
        setIsEmailValid(isValid);
        return isValid;
    }

    const handleResetPassword = async () => {
        if (validateEmail()) {
            try {
                await checkEmail(form.getFieldValue('email')).unwrap();
                dispatch(setEmail({email: form.getFieldValue('email'), retryEmail: false}));
                navigate(PATHS.confirmEmail, {state: {from: 'redirect'}});
            } catch (e) {
                if (e.data?.message === 'Email не найден') {
                    navigate(PATHS.resultErrorNoEmailExist, {state: {from: 'redirect'}});
                    return;
                } else {
                    navigate(PATHS.resultErrorCheckEmail, {state: {from: 'redirect'}});
                    dispatch(setEmail({email: form.getFieldValue('email'), retryEmail: true}));
                }
            }
        }
    }

    useEffect(() => {
        const f = async () => {
            try {
                await checkEmail(form.getFieldValue('email')).unwrap();
                dispatch(setEmail({email: form.getFieldValue('email'), retryEmail: false}));
                navigate(PATHS.confirmEmail, {state: {from: 'redirect'}});
            } catch (e) {
                if (e.data?.message === 'Email не найден') {
                    navigate(PATHS.resultErrorNoEmailExist, {state: {from: 'redirect'}});
                    return;
                } else {
                    navigate(PATHS.resultErrorCheckEmail, {state: {from: 'redirect'}});
                    dispatch(setEmail({email: form.getFieldValue('email'), retryEmail: true}));
                }
            }
        }

        if (auth.retryEmail) {
            f()
        }
    }, []);

    return (<>
        {isLoading && <Loader/>}
        <Form
            name='auth'
            form={form}
            autoComplete='on'
            className={styles.form}
            onFinish={onSubmit}
            onFieldsChange={(changedFields) => {
                const emailField = changedFields.find((field) => field.name.includes('email'));
                if (emailField) validateEmail();
            }}
        >
            <Form.Item name='email'
                       rules={[{required: true, message: ''}, {validator: isValidEmail}]}
                       validateStatus={isEmailValid ? 'success' : 'error'}>
                <Input data-test-id='login-email'
                       addonBefore='e-mail:' className={styles.email}/>
            </Form.Item>
            <Form.Item name='password'
                       rules={[{required: true, message: ''}, {validator: isValidPassword}]}>
                <Input.Password data-test-id='login-password'
                                placeholder='Пароль'/>
            </Form.Item>
            <div className={styles.row}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox data-test-id='login-remember' checked={true}>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item className={styles.link}>
                    <Button
                        disabled={!isEmailValid}
                        onClick={handleResetPassword}
                        data-test-id='login-forgot-button' type='link'
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>
            </div>
            <Form.Item style={{marginBottom: '16px'}}>
                <Button
                    type='primary'
                    className={styles.btn}
                    htmlType='submit'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Войти через Google
                </Button>
            </Form.Item>
        </Form>
    </>)
}
