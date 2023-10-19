/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            console.log('error');
        } else {
            this.element = element;
            //console.log('constructor', this.element);
        }
    }

    /**
     * Получает информацию о текущем пользователе
     * с помощью User.current()
     * Если пользователь авторизован,
     * в элемент .user-name устанавливает имя
     * авторизованного пользователя
     * */
    update() {
        //console.log('update', this.element);
        const user = User.current();
       // console.log('update',user);
        this.element.querySelector('.user-name').textContent = `${user.name}`;
    }
}
