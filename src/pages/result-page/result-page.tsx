import {ResultCard} from "@components/card";
import styles from './result-page.module.less'

export const ResultPage = () => {

    return (
        <div className={styles.wrapper}>
            <ResultCard icon={''} title={'dssd'} description={'dsd'} btnText={'dsd'} btnAction={()=>true}/>
        </div>
    );
};
