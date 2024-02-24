import {CloseCircleFilled} from "@ant-design/icons";
import {PATHS} from "@constants/paths.ts";

export const AuthResults = {
    'error-login': {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: 'Что-то пошло не так. Попробуйте еще раз',
        buttonText: 'Повторить',
        redirectTo: PATHS.auth,
    },
    success: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль',
        buttonText: 'Войти',
        redirectTo: PATHS.auth,
    },
    'error': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        buttonText: 'Повторить',
        redirectTo: PATHS.register,
    },
    'error-user-exist': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail',
        buttonText: 'Назад к регистрации',
        redirectTo: PATHS.register,
    },
};

export const SEND_CODE_STATUS = {
    error: {
        icon: <CloseCircleFilled style={{'color': '#ff4d4f'}}/>,
        title: 'Что-то пошло не так',
        notExistTitle: 'Такой e-mail не зарегестрирован',
        description: 'Произошла ошибка, попробуйте отправить форму ещё раз',
        notExistDescription: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        buttonText: 'Назад',
        notExistButtonText: 'Попробовать снова',
    },
};

export const CREATE_PASSWORD_STATUS = {
    success: {
        title: 'Пароль успешно изменен',
        description: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        buttonText: 'Вход',
    },
    error: {
        title: 'Данные не сохранились',
        description: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
    },
};
