import {useNavigate} from 'react-router-dom';
import {FormInstance} from 'antd';
import {setEmail, setToken} from '@redux/slices/auth-slice.ts';
import {useCheckEmailMutation, useLoginMutation} from '@redux/api/auth-api.ts';
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {PATHS} from '@constants/paths.ts';

export type FormFields = {
    email: string;
    password: string;
    remember: boolean;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, {isLoading: isLoginLoading}] = useLoginMutation();
    const [checkEmail, {isLoading: isCheckEmailLoading}] = useCheckEmailMutation();

    const onSubmit = async (data: FormFields) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 100)); // иначе 1ый тест не находит Loader
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

    const retry = async (form: FormInstance) => {
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

    return {onSubmit, retry, isLoginLoading, isCheckEmailLoading};
}
