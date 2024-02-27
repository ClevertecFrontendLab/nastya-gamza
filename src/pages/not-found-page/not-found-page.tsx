import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";
import {PATHS} from "@constants/paths.ts";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoMain = () => {
        navigate(PATHS.main)
    }

    return (
        <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
                <Button type='primary' onClick={handleGoMain}>
                    Вернуться на главную страницу
                </Button>}
        />
    )
};
