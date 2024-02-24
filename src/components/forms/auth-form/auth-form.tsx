import {useState} from "react";
import {Button, Checkbox, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from "@ant-design/icons";
import {isValidEmail, isValidPassword} from "@utils/validation.ts";
import styles from './auth-form.module.less';
import {useLoginMutation} from "@redux/api/auth-api.ts";
import {push} from "redux-first-history";
import {PATHS} from "@constants/paths.ts";
import {useDispatch} from "react-redux";
import {Loader} from "@components/loader/loader.tsx";
import {LoginRequest} from "@constants/auth.ts";

const {useBreakpoint} = Grid;

export const AuthForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const onSubmit = async (data: LoginRequest) => {
        await login(data).unwrap();
        dispatch(push(PATHS.main));
    }

    const validateEmail = () => {
        const isValid = form.isFieldTouched('email') && form.getFieldError('email').length === 0;
        setIsEmailValid(isValid);
        return isValid;
    }

    const handleResetPassword = () => {
        if (validateEmail()) {
            console.log('yeees')
        }
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Form
            form={form}
            name='auth'
            initialValues={{remember: true}}
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
                <Input addonBefore='e-mail:' className={styles.email}/>
            </Form.Item>
            <Form.Item name='password'
                       rules={[{required: true, message: ''}, {validator: isValidPassword}]}>
                <Input.Password placeholder='Пароль'/>
            </Form.Item>
            <div className={styles.row}>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item className={styles.link}>
                    <Button disabled={!isEmailValid} onClick={handleResetPassword} type="link">Забыли пароль?</Button>
                </Form.Item>
            </div>
            <Form.Item style={{marginBottom: '16px'}}>
                <Button type='primary' className={styles.btn} htmlType='submit'>Войти</Button>
            </Form.Item>
            <Form.Item>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Войти через Google
                </Button>
            </Form.Item>
        </Form>)
}
