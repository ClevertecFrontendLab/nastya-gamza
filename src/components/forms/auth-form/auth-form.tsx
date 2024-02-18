import {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Checkbox, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from "@ant-design/icons";
import {isValidEmail, isValidPassword} from "@utils/validation.ts";
import styles from './auth-form.module.less';

const {useBreakpoint} = Grid;

export const AuthForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleBtnChange = () => {
        const hasErrors = form.getFieldsError(['email']).some(({ errors }) => errors.length);
        setIsDisabled(hasErrors);
    }

    return (
        <Form
            form={form}
            name='auth'
            initialValues={{remember: true}}
            autoComplete='on'
            className={styles.form}
            onFieldsChange={handleBtnChange}
        >
            <Form.Item name='email' rules={[{required: true, message: ''}, { validator: isValidEmail }]}>
                <Input addonBefore='e-mail:' className={styles.email} />
            </Form.Item>
            <Form.Item name='password' rules={[{required: true, message: ''}, { validator: isValidPassword }]}>
                <Input.Password placeholder='Пароль'/>
            </Form.Item>
            <div className={styles.row}>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item name="restore" className={styles.link}>
                    <Link to="/">
                        <Button disabled={isDisabled} type="link" >Забыли пароль?</Button>
                    </Link>
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
