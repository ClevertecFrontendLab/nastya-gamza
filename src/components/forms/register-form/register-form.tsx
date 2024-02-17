import {Button, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from "@ant-design/icons";
import styles from './register-form.module.less';

const {useBreakpoint} = Grid;

export const RegisterForm = () => {
    const screens = useBreakpoint();

    return (
        <Form
            name='register'
            initialValues={{remember: true}}
            autoComplete='off'
            className={styles.form}
        >
            <Form.Item rules={[{required: true, message: 'Please input your username!'}]}>
                <Input addonBefore={'e-mail:'} style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item className={styles.password} rules={[{required: true, message: 'Please input your password!'}]}
                       extra="Пароль не менее 8 символов, с заглавной буквой и цифрой">
                <Input.Password placeholder={'Пароль'}/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password placeholder={'Повторите пароль'}/>
            </Form.Item>
            <div className={styles.btnWrapper}>
                <Button type={'primary'} className={styles.btn} htmlType="submit">Войти</Button>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Регистрация через Google
                </Button>
            </div>
        </Form>)
}
