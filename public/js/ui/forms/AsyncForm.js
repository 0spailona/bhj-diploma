/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
        if (!element) {
            console.log('error');
        } else {
            this.element = element;
            this.registerEvents();
        }
    }

    /**
     * Необходимо запретить отправку формы и в момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
            this.submit();
        })
    }

    /**
     * Преобразует данные формы в объект вида
     * {
     *  'название поля формы 1': 'значение поля формы 1',
     *  'название поля формы 2': 'значение поля формы 2'
     * }
     * */
    getData() {
        //через formData
        const formData = new FormData(this.element);
        const data = {};
        for (let entry of formData.entries()) {
            data[entry[0]] = entry[1];
        }
        // через объект
        /*const data = {};
        for (let input of this.element.querySelectorAll('input')) {
            data[input.name] = input.value;
        }*/
        //console.log(JSON.stringify(data));
        //console.log(JSON.stringify(data2));
        return data;
    }

    onSubmit(options) {

    }

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        this.onSubmit(this.getData());
    }
}