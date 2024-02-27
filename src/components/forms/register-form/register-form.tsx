import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FieldData} from 'rc-field-form/lib/interface';
import {Button, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from '@ant-design/icons';
import {isValidConfirmPassword, isValidEmail, isValidPassword,} from '@utils/validation.ts';
import styles from './register-form.module.less';
import {useRegisterMutation} from '@redux/api/auth-api.ts';
import {Loader} from '@components/loader';
import {RegisterRequest} from '@constants/auth.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {PATHS} from '@constants/paths.ts';
import {setCredentials} from '@redux/slice/auth-slice.ts';
import {HTTP_STATUSES} from "@constants/http-statuses.ts";

const {useBreakpoint} = Grid;

export const RegisterForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [register, {isLoading}] = useRegisterMutation();
    const {retryRegister, credentials} = useAppSelector(authSelector);

    const validateFields = (_changedFields: FieldData[], allFields: FieldData[]) => {
        if (allFields.every(field => field.touched)) {
            const hasErrors = form.getFieldsError(['email', 'password', 'confirm-password'])
                .some(({errors}) => errors.length);
            setIsDisabled(hasErrors);
        }
    }

    const onSubmit = async (data: RegisterRequest) => {
        try {
            await register(data).unwrap();
            navigate(PATHS.resultSuccess, {state: {from: 'redirect'}});
            dispatch(setCredentials({credentials: data, retryRegister: false}));
        } catch (e) {
            if (e.status === HTTP_STATUSES.conflict) {
                navigate(PATHS.resultErrorUserExist, {state: {from: 'redirect'}});
                return;
            }
            navigate(PATHS.resultErrorRegister, {state: {from: 'redirect'}});
            dispatch(setCredentials({credentials: data, retryRegister: true}));
        }
    }

    useEffect(() => {
        if (retryRegister) {
            register(credentials).unwrap().catch(e => {
                if (e.status === HTTP_STATUSES.conflict) {
                    navigate(PATHS.resultErrorUserExist, {state: {from: 'redirect'}});
                    return;
                }
                navigate(PATHS.resultErrorRegister, {state: {from: 'redirect'}});
            });
        }
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Form
            form={form}
            name='register'
            autoComplete='off'
            className={styles.form}
            onFieldsChange={validateFields}
            onFinish={onSubmit}
        >
            <Form.Item name='email'
                       rules={[{required: true, message: ''}, {validator: isValidEmail}]}>
                <Input data-test-id='registration-email' addonBefore={'e-mail:'}/>
            </Form.Item>
            <Form.Item
                name='password'
                className={styles.password}
                rules={[{required: true, message: ''}, {validator: isValidPassword}]}
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            >
                <Input.Password data-test-id='registration-password' placeholder={'Пароль'}/>
            </Form.Item>
            <Form.Item
                name='confirm-password'
                dependencies={['password']}
                rules={[{required: true, message: ''}, isValidConfirmPassword]}
            >
                <Input.Password data-test-id='registration-confirm-password'
                                placeholder={'Повторите пароль'}/>
            </Form.Item>
            <div className={styles.btnWrapper}>
                <Button
                    type={'primary'}
                    disabled={isDisabled}
                    className={styles.btn}
                    htmlType='submit'
                    data-test-id='registration-submit-button'
                >
                    Войти
                </Button>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Регистрация через Google
                </Button>
            </div>
        </Form>)
}
