/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Вызывает AccountsWidget.update() для получения
     * списка счетов и последующего отображения
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            errors(null, "The account is undefined");
        } else {
            this.element = element;
            this.registerEvents();
            this.update();
        }
    }

    /**
     * При нажатии на .create-account открывает окно
     * #modal-new-account для создания нового счёта
     * При нажатии на один из существующих счетов
     * (которые отображены в боковой колонке),
     * вызывает AccountsWidget.onSelectAccount()
     * */
    registerEvents() {
        this.element.querySelector('.create-account').addEventListener('click', e => {
            App.getModal('createAccount').open();
        });
        this.element.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.classList.contains('create-account')) {
                return;
            }
            this.onSelectAccount(e.target.closest('.account'));
        });
    }

    /**
     * Метод доступен только авторизованным пользователям
     * (User.current()).
     * Если пользователь авторизован, необходимо
     * получить список счетов через Account.list(). При
     * успешном ответе необходимо очистить список ранее
     * отображённых счетов через AccountsWidget.clear().
     * Отображает список полученных счетов с помощью
     * метода renderItem()
     * */
    update() {
        if (!User.current()) {
            return;
        }
        Account.list({}, (err, serverData) => {
            if (err) {
                errors(err, 'Error');
                return;
            }
            if (serverData.success) {
                this.clear();
                this.renderItem(serverData.data);
            } else {
                errors(null, "The account's list is undefined");
            }
        });
    }

    /**
     * Очищает список ранее отображённых счетов.
     * Для этого необходимо удалять все элементы .account
     * в боковой колонке
     * */
    clear() {
        const sideBarEl = document.querySelector('.sidebar');
        for (let account of sideBarEl.querySelectorAll('.account')) {
            account.remove();
        }
    }

    /**
     * Срабатывает в момент выбора счёта
     * Устанавливает текущему выбранному элементу счёта
     * класс .active. Удаляет ранее выбранному элементу
     * счёта класс .active.
     * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
     * */
    onSelectAccount(element) {
        if (this.element.querySelector('.active')) {
            this.element.querySelector('.active').classList.remove('active');
        }
        element.classList.add('active');
        this.aciveAccountId = element.dataset.id;
        App.showPage('transactions', {account_id: element.dataset.id});
    }

    /**
     * Возвращает HTML-код счёта для последующего
     * отображения в боковой колонке.
     * item - объект с данными о счёте
     * */
    getAccountHTML(item) {
        if (this.aciveAccountId) {

        }
        const newAccount = document.createElement('li');
        if (this.aciveAccountId && item.id === this.aciveAccountId) {
            newAccount.classList.add('account', 'active');
        } else {
            newAccount.classList.add('account');
        }
        newAccount.dataset.id = item['id'];
        this.element.appendChild(newAccount);
        return newAccount.insertAdjacentHTML('beforeend', `
        <a href="#">
        <span>${item['name']}</span> /
        <span>${item['sum']} ₽</span>
        </a>
        `);
    }

    /**
     * Получает массив с информацией о счетах.
     * Отображает полученный с помощью метода
     * AccountsWidget.getAccountHTML HTML-код элемента
     * и добавляет его внутрь элемента виджета
     * */
    renderItem(data) {
        for (let item of data) {
            this.getAccountHTML(item);
        }
    }
}
