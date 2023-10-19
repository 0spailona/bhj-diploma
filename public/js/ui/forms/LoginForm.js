/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
    /**
     * Производит авторизацию с помощью User.login
     * После успешной авторизации, сбрасывает форму,
     * устанавливает состояние App.setState( 'user-logged' ) и
     * закрывает окно, в котором находится форма
     * */
    onSubmit(data) {
        function callback(err, serverData) {
            if (err) {
                console.error(err);
                return;
            }
            if (serverData && serverData.success) {
                console.log('onSubmit', serverData);
                App.updateForms();
                App.setState('user-logged');

                const modalName = 'login';
                App.getModal(modalName).close();
            } else {
                alert(`Пользователь c email ${data.email} и паролем ${data.password} не найден`);
            }
        }

        User.login(data, callback);
    }
}