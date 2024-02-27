import {useNavigate} from 'react-router-dom';
import {useChangePasswordMutation} from '@redux/api/auth-api.ts';
import {setPassword} from '@redux/slice/auth-slice.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {ChangePasswordRequest} from '@constants/auth.ts';
import {PATHS} from '@constants/paths.ts';

export const useChangePassword = () => {
    const [changePassword, {isLoading}] = useChangePasswordMutation();
    const navigate = useNavigate();
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

    return {onSubmit, isLoading}
}
