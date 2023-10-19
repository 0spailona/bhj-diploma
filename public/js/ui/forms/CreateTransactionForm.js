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
                console.error(err);
                return;
            }
            if (serverData.success) {
                for (let account of serverData.data) {
                    const optionEl = document.createElement('option');
                    optionEl.value = account.id;
                    optionEl.text = account.name;
                    //console.log('value', optionEl.value, 'text', optionEl.text);
                    this.element.querySelector('.accounts-select').appendChild(optionEl);
                }
            } else {
                console.log('Сначала создайте счёт');
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
        console.log('onSubmit',data);

        function callback(err, serverData) {

            if (err) {
                console.error(err);
                return;
            }
            if (serverData.success) {

                //console.log('onSubmit.callback',serverData);
                const modalName = 'newIncome' || 'newExpense';
                App.getModal(modalName).close();
                App.update();
            }
        }

        Transaction.create(data, callback);
    }
}