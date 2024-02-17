import {Link} from "react-router-dom";
import {Button, Checkbox, Form, Grid, Input} from 'antd';
import {GooglePlusOutlined} from "@ant-design/icons";
import styles from './auth-form.module.less';

const {useBreakpoint} = Grid;

export const AuthForm = () => {
    const screens = useBreakpoint();

    return (
        <Form
            name='auth'
            initialValues={{remember: true}}
            autoComplete='off'
            className={styles.form}
        >
            <Form.Item rules={[{required: true, message: 'Please input your username!'}]}>
                <Input addonBefore={'e-mail:'} style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password placeholder={'Пароль'}/>
            </Form.Item>
            <div className={styles.row}>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item name="restore" className={styles.link}>
                    <Link to={'/'}>Забыли пароль?</Link>
                </Form.Item>
            </div>
            <Form.Item style={{marginBottom: '16px'}}>
                <Button type={'primary'} className={styles.btn} htmlType="submit">Войти</Button>
            </Form.Item>
            <Form.Item>
                <Button className={styles.btn}>
                    {screens.xs ? '' : <GooglePlusOutlined/>} Войти через Google
                </Button>
            </Form.Item>
        </Form>)
}
