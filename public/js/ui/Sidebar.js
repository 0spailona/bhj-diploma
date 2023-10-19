/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        function showAndHideMenu(e) {
            e.preventDefault();
            const bodyEl = document.querySelector('body');
            if (bodyEl.classList.contains('sidebar-open')) {
                bodyEl.classList.remove('sidebar-open');
                bodyEl.classList.add('sidebar-collapse');
            } else if (bodyEl.classList.contains('sidebar-collapse')) {
                bodyEl.classList.remove('sidebar-collapse');
                bodyEl.classList.add('sidebar-open');
            } else {
                bodyEl.classList.add('sidebar-open');
            }
        }

        document.querySelector('.sidebar-toggle').addEventListener('click', showAndHideMenu)
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регистрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {

        function showModal(e, modalName) {
            e.preventDefault();
            App.getModal(modalName).open();
        }

        function logout(e) {
            e.preventDefault();
            User.logout(() => App.setState('init'));
        }

        document.querySelector('.menu-item_login').addEventListener('click', e => showModal(e, 'login'));
        document.querySelector('.menu-item_register').addEventListener('click', e => showModal(e, 'register'));
        document.querySelector('.menu-item_logout').addEventListener('click', logout);
    }
}