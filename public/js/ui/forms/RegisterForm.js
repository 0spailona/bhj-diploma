/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
    /**
     * Производит регистрацию с помощью User.register
     * После успешной регистрации устанавливает
     * состояние App.setState( 'user-logged' )
     * и закрывает окно, в котором находится форма
     * */
    onSubmit(data) {

        function callback(err, serverData) {
            if (err) {
                console.error(err);
                return;
            }
            if (data.password.length < 3) {
                alert(`Количество символов в поле Пароль должно быть не менее 3.`);
                return;
            }
            if (serverData.success) {
                User.setCurrent(serverData.user);
                App.setState('user-logged');

                const modalName = 'register';
                App.getModal(modalName).close();
            }
        }

        User.register(data, callback);
    }
}