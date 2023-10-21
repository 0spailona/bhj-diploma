/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
    /**
     * Создаёт счёт с помощью Account.create и закрывает
     * окно в случае успеха, а также вызывает App.update()
     * и сбрасывает форму
     * */
    onSubmit(data) {
        function callback(err, serverData) {
            if (err) {
                errors(null, `Error`)
                return;
            }
            if (serverData.success) {
                const modalName = 'createAccount';
                App.getModal(modalName).close();
                App.update();
            } else if (!serverData.success) {
                errors(null, "The account wasn't created");
            }
        }

        Account.create(data, callback);
    }
}