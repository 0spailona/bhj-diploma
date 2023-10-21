/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

//Если сделать DELETE как общепринято, сервер выдает 500
const methodsWithoutBody = ['get', '-delete', 'head'];

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let formData = null;

    if (methodsWithoutBody.includes(options.method.toLowerCase())) {
        url = url + '?';
        for (let key of Object.keys(options.data)) {
            const coupleData = `${key}=${options.data[key]}`;
            url = url + coupleData + '&';
        }
        url = url.slice(0, url.length - 1);
    } else {
        formData = new FormData;
        for (let item of Object.keys(options.data)) {
            formData.append(item, options.data[item]);
        }
    }
    xhr.responseType = 'json';

    xhr.addEventListener('loadend', e => {

        if (Math.trunc(e.target.status / 100) === 2) {
            try {
                options.callback(null, xhr.response);
            } catch (e) {
                errors(e, 'Error during callback');
            }
        } else {
            errors(null, `Error:${e.target.status}`);
        }
    })
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        options.callback(options.err, null);
    }

}
