import {ReactNode} from "react";
import {Button, Card} from "antd";
import styles from './result-card.module.less';
import {push} from "redux-first-history";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";

type ResultCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    btnText: string;
    path: string;
};

export const ResultCard = ({icon, title, description, btnText, path}: ResultCardProps) => {
    const dispatch = useAppDispatch();

    const handleClick = (path: string) => {
        dispatch(push(path));
    }

    return (
        <Card className={styles.container}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.description}>{description}</div>
            <Button type={'primary'} className={styles.btn} onClick={() => handleClick(path)}>
                {btnText}
            </Button>
        </Card>
    )
};
