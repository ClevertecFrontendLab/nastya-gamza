import {Link} from 'react-router-dom';
import {Layout, Row} from 'antd';
import {ActionCard} from '@components/card';
import {PHONES} from '../../contants/phones.tsx';
import styles from './page-footer.module.less'

const {Footer} = Layout;
export const PageFooter = () => (
    <>
        <Footer className={styles.footer}>
            <Row align='bottom' className={styles.row}>
                <Link to='/' className={styles.link}>Смотреть отзывы</Link>
                <ActionCard
                    className={styles.card}
                    title={
                        <div className={styles['card-header']}>
                            <Link to='#' className={styles['download-btn']}>Скачать на
                                телефон</Link>
                            <p className={styles['pro-tariff']}>Доступно в PRO-тарифе</p>
                        </div>
                    }
                >
                    <div className={styles.phones}>
                        {PHONES.map(p => <Link to={'/'} key={p.name}>{p.icon} {p.name}</Link>)}
                    </div>
                </ActionCard>
            </Row>
        </Footer>
    </>
);