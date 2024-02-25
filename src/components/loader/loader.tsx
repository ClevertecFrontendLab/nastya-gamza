import Lottie from 'lottie-react';
import loader from './assets/loader-animation.json'
import styles from './loader.module.less';

export const Loader = () => (
    <div className={styles.wrapper}>
        <Lottie animationData={loader} loop={true} className={styles.loader} data-test-id='loader' />
    </div>
);
