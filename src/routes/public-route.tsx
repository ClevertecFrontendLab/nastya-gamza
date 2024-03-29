import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PATHS} from '@constants/paths.ts';

export const PublicRoute = () => {
    const navigate = useNavigate();
    const {token} = useAppSelector(authSelector);
    const localStorageToken = localStorage.getItem('token');

    useEffect(() => {
        if (token || localStorageToken) {
            navigate(PATHS.main, {replace: true});
        }
    }, [navigate]);

    return <Outlet/>;
}
