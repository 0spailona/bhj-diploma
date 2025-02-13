/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            errors(null, 'The element is undefined');
        } else {
            this.element = element;
            this.registerEvents();
        }
    }

    /**
     * Регистрирует обработчики нажатия на
     * кнопки «Новый доход» и «Новый расход».
     * При нажатии вызывает Modal.open() для
     * экземпляра окна
     * */
    registerEvents() {

        function showModal(e, modalName) {
            e.preventDefault();
            App.getModal(modalName).open();
        }

        document.querySelector('.create-income-button').addEventListener('click', e => showModal(e, 'newIncome'));
        document.querySelector('.create-expense-button').addEventListener('click', e => showModal(e, 'newExpense'));

    }
}
