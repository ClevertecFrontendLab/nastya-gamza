import styles from './result-page.module.less'
import {Button, Card, Result} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {AuthResults} from "@constants/auth-statuses.tsx";

export const ResultPage = () => {
    const {type} = useParams();
    const navigate = useNavigate();
    const {status, title, subTitle, buttonText, redirectTo} = AuthResults[type];

    const handleClick = () => {
        navigate(redirectTo);
    }

    return (
        <Card className={styles.card}>
            <Result status={status} title={title} subTitle={subTitle}
                    extra={[
                        <Button onClick={handleClick} size={"large"} block type="primary">
                            {buttonText}
                        </Button>,
                    ]}/>
        </Card>
    );
}
