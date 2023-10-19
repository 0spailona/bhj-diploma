/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

//Если сделать DELETE как общепринято, сервер выдает 500
const methodsWithoutBody = ['get', '-delete', 'head'];

const createRequest = (options = {}) => {
    //console.log(options);
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let formData = null;
    //console.log(options);

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
            console.log(xhr.response);
            try {
                options.callback(null, xhr.response);
            }
            catch (e)
            {
                console.log("Error during callback", e);
            }
        } else {
            console.log(`Error:${e.target.status}`);
        }
    })
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        //console.error(e);
        options.callback(options.err, null);
    }

}
/*
function getDataAndCallback(data, callback, errFunc) {
    const url = '/account';
    //const url = 'http://localhost:8000';
    //const url = 'http://localhost:63342';
    //const url = '/transaction';
    //const url = '/user';

    callCreateRequest(url, data, callback, errFunc)
}

function callCreateRequest(url, data, callback, errFunc) {
    const method = 'GET';
    //const method = 'POST';
    //const method = 'PUT';
    //const method = 'DELETE';
    try {
        createRequest({url, data, callback, errFunc, method});
    } catch (e) {
        console.log('!!!');
    }

}

function getDataFromForm() {
   const data = {
        id: 12,
        name: 'Vlad'
    };

    /*const data = {
        mail: 'ivan@biz.pro'
    };*/
//const data = {};
//console.log(Object.keys(data))

/*const data={
    mail: 'ivan@biz.pro',
    password: 'odinodin'
}*/

/* function callback() {
     console.log('success');
 }

 function errFunc() {
     console.log('err');
 }

 if (Object.keys(data).length < 1) {
     console.log('none data');
 } else {
     getDataAndCallback(data, callback, errFunc);
 }
}

getDataFromForm();*/
