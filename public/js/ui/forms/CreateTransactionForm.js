/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
    /**
     * Вызывает родительский конструктор и
     * метод renderAccountsList
     * */
    constructor(element) {
        super(element);
        this.renderAccountsList();
    }

    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {
        if (!User.current()) {
            return;
        }

        function callback(err, serverData) {
            if (err) {
                errors(err, 'Error')
                return;
            }

            if (serverData.success) {

                for (let option of this.element.querySelectorAll('option')) {
                    option.remove();
                }
                for (let account of serverData.data) {
                    const optionEl = document.createElement('option');
                    optionEl.value = account.id;
                    optionEl.text = account.name;
                    this.element.querySelector('.accounts-select').appendChild(optionEl);
                }

            }
        }

        Account.list(User.current(), callback.bind(this));
    }

    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(data) {
        function callback(err, serverData) {

            if (err) {
                errors(err, 'Error');
                return;
            }
            if (serverData.success) {
                let modalName = this.element.closest('.modal').dataset.modalId;
                this.element.reset();
                App.update();
                App.getModal(modalName).close();
            } else if (!serverData.success) {
                errors(null, "The transaction wasn't created");
            }
        }

        Transaction.create(data, callback.bind(this));
    }
}