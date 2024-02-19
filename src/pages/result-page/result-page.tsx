import {ReactNode} from "react";
import {ResultCard} from "@components/card";
import styles from './result-page.module.less'

interface ResultPageProps {
    icon: ReactNode,
    title: string,
    description: string,
    btnText: string,
    path: string,
}

export const ResultPage = ({icon, title, description, btnText, path}: ResultPageProps) => (
    <div className={styles.wrapper}>
        <ResultCard
            icon={icon}
            title={title}
            description={description}
            btnText={btnText}
            path={path}/>
    </div>
);
