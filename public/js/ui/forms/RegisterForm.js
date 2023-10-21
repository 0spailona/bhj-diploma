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
                errors(err, 'Error');
                return;
            }
            if (data.password.length < 3) {
                alert(`Количество символов в поле Пароль должно быть не менее 3.`);
                return;
            }
            if (serverData.success) {
                User.setCurrent(serverData.user);
                App.setState('user-logged');

                let modalName = this.element.closest('.modal').dataset.modalId;
                App.getModal(modalName).close();
            } else {
                errors(null, "The user wasn't registered");
            }

        }

        User.register(data, callback.bind(this));
    }
}