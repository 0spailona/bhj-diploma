/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static url = '/user';

    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        //console.log('setCurrent',user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        //console.log('current',JSON.parse(localStorage.getItem('user')));
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(callback) {
        createRequest({data: {}, method: 'GET', url: this.url + '/current',  callback: (err, response) => {
            if (response && response.user) {
                this.setCurrent(response.user);
            }
            callback(err, response);
        }});
        //+setCurrent?
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        console.log('login',data);
        createRequest({
            url: this.url + '/login',
            method: 'POST',
            responseType: 'json',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        createRequest({method: 'POST', url: this.url + '/register', data, callback});
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(callback) {
        createRequest({method: 'POST', url: this.url + '/logout', data: {}, callback});
        User.unsetCurrent();
    }
}

function callbackForFetch(serverData) {
    if (serverData.success) {
        this.setCurrent(serverData.user);
    } else {
        this.unsetCurrent();
    }
}


