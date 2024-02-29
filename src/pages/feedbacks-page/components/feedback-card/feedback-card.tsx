import {Avatar, Card, Rate, Typography} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import styles from './feedback-card.module.less';
import * as dayjs from 'dayjs';

const {Text, Title} = Typography;

type FeedbackCardProps = {
    fullName: string | null,
    imageSrc: string | null,
    message: string | null,
    rating: number,
    createdAt: string,
}

export const FeedbackCard = ({fullName, imageSrc, message, rating, createdAt}: FeedbackCardProps) => {
    const [name, surname] = fullName?.split(' ') ?? [];
    const formattedDate = dayjs(createdAt).format('DD.MM.YYYY');

    return (
            <Card>
                <div className={styles.wrapper}>
                    <div className={styles.userWrapper}>
                        <Avatar size={42} icon={imageSrc || <UserOutlined/>} className={styles.avatar}/>
                        <div>
                            <Title level={5}>{name}</Title>
                            <Title level={5}>{surname}</Title>
                        </div>
                    </div>
                    <div className={styles.feedbackWrapper}>
                        <div className={styles.rating}>
                            <Rate value={rating}/>
                            <Text className={styles.date}>{formattedDate}</Text>
                        </div>
                        <Text type={'secondary'}>{message}</Text>
                    </div>
                </div>
            </Card>
    )
}