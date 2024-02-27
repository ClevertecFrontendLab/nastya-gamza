import {useEffect, useState} from 'react';
import {Button, Form, Grid, Input} from 'antd';
import {FieldData} from 'rc-field-form/lib/interface';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {Loader} from '@components/loader';
import {isValidConfirmPassword, isValidEmail, isValidPassword,} from '@utils/validation.ts';
import {useRegister} from "@pages/auth-page/hooks/use-register.ts";
import {GooglePlusOutlined} from '@ant-design/icons';
import styles from './register-form.module.less';

const {useBreakpoint} = Grid;

export const RegisterForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const {retryRegister, credentials} = useAppSelector(authSelector);
    const {onSubmit, isLoading} = useRegister();

    const validateFields = (_changedFields: FieldData[], allFields: FieldData[]) => {
        if (allFields.every(field => field.touched)) {
            const hasErrors = form.getFieldsError(['email', 'password', 'confirm-password'])
                .some(({errors}) => errors.length);
            setIsDisabled(hasErrors);
        }
    }

    useEffect(() => {
        if (retryRegister) {
            onSubmit(credentials);
        }
    }, [credentials, onSubmit, retryRegister]);

    return (
        <>
            {isLoading && <Loader/>}
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
            </Form>
        </>
    )
}
