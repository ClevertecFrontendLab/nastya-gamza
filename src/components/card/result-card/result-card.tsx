import {ReactNode} from "react";
import {Button, Card} from "antd";
import styles from './result-card.module.less';

type ResultCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    btnText: string;
    btnAction: () => void;
};

export const ResultCard = ({ icon, title, description, btnText, btnAction }: ResultCardProps) => (
    <Card className={styles.container}>
        <div>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
        {btnText && (
            <Button type={'primary'} onClick={btnAction}>
                {btnText}
            </Button>
        )}
    </Card>
);
