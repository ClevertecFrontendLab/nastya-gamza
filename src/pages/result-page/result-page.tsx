import styles from './result-page.module.less'
import {Button, Card, Result} from "antd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {AuthResults} from "@constants/auth-statuses.ts";
import {useEffect} from "react";
import {PATHS} from "@constants/paths.ts";

export const ResultPage = () => {
    const {type} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {status, title, subTitle, buttonText, redirectTo, buttonTestId} = AuthResults[type];

    useEffect(() => {
        const state = location.state;

        if (state?.from !== 'redirect' && localStorage.getItem('token')) {
            navigate(PATHS.main);
            return;
        }

        if (state?.from !== 'redirect') {
            navigate(PATHS.auth);
        }
    }, []);

    const handleClick = () => {
        navigate(redirectTo);
    }

    return (
        <Card className={styles.card}>
            <Result status={status} title={title} subTitle={subTitle}
                    extra={[
                        <Button onClick={handleClick} data-test-id={buttonTestId} size={"large"}
                                block type="primary">
                            {buttonText}
                        </Button>,
                    ]}/>
        </Card>
    );
}
