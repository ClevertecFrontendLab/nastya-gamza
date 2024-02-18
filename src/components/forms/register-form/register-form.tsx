import {useState} from "react";
import {Button, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from "@ant-design/icons";
import { FieldData } from "rc-field-form/lib/interface";
import {
    isValidEmail,
    isValidPassword,
    isValidConfirmPassword,
} from "@utils/validation.ts";
import styles from './register-form.module.less';

const {useBreakpoint} = Grid;

export const RegisterForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleBtnChange = (_changedFields: FieldData[], allFields: FieldData[]) => {
        if(allFields.every(field => field.touched)) {
            const hasErrors = form.getFieldsError(['email', 'password', 'confirm-password'])
                            .some(({ errors }) => errors.length);
            setIsDisabled(hasErrors);
        }
    }

    return (
        <Form
            form={form}
            name='register'
            initialValues={{remember: true}}
            autoComplete='off'
            className={styles.form}
            onFieldsChange={handleBtnChange}
        >
            <Form.Item name='email'
                       rules={[{required: true, message: ''}, {validator: isValidEmail}]}>
                <Input addonBefore={'e-mail:'} style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item
                name='password'
                className={styles.password}
                rules={[{required: true, message: ''}, {validator: isValidPassword}]}
                help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
            >
                <Input.Password placeholder={'Пароль'}/>
            </Form.Item>
            <Form.Item
                name='confirm-password'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    isValidConfirmPassword
                ]}
            >
                <Input.Password placeholder={'Повторите пароль'}/>
            </Form.Item>
            <div className={styles.btnWrapper}>
                <Button disabled={isDisabled} type={'primary'} className={styles.btn}
                        htmlType="submit">Войти</Button>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Регистрация через Google
                </Button>
            </div>
        </Form>)
}
