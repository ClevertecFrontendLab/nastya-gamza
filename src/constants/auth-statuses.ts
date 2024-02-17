export const AUTH_STATUS = {
    error: {
        title: 'Вход не выполнен',
        description: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
    },
};

export const REGISTRATION_STATUS = {
    success: {
        title: 'Регистрация успешна',
        description:
            'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль',
        buttonText: 'Войти',
    },
    error: {
        title: 'Данные не сохранились',
        description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        alreadyUsedDescription:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail',
        buttonText: 'Повторить',
        alreadyUsedButtonText: 'Назад к регистрации',
    },
};

export const SEND_CODE_STATUS = {
    error: {
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
