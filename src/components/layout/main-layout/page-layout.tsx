import {Outlet} from 'react-router-dom';
import {Layout} from 'antd';
import {SideBar} from '@components/sidebar';
import {PageHeader} from '@components/page-header';
import {useSidebarContext} from '../../../context/sidebar/use-sidebar-context.ts';
import styles from './page-layout.module.less'

export const PageLayout = () => {
    const {collapsed} = useSidebarContext();

    return (
        <Layout className={styles.layout}>
            <SideBar/>
            <Layout className={collapsed ? styles.close : styles.open} >
                <PageHeader/>
                <Outlet/>
            </Layout>
        </Layout>
    )
}
