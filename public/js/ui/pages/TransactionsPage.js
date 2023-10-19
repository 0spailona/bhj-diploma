/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
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
     * Вызывает метод render для отрисовки страницы
     * */
    update() {
        if (this.lastOptions) {
            this.render(this.lastOptions);

        } else {
            // console.log('update',this.element);
        }

        ///где взять id
        //this.render();
    }

    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. Внутри обработчика пользуйтесь
     * методами TransactionsPage.removeTransaction и
     * TransactionsPage.removeAccount соответственно
     * */
    registerEvents() {
        this.element.querySelector('.remove-account').addEventListener('click', e => {
            this.removeAccount();
        });

        /* this.element.addEventListener('click', e => {
             console.log('registerEvents',e.target);
             console.log('registerEvents',e.target.dataset.id);
             this.removeTransaction(e.target.dataset.id);
         });*/
    }

    /**
     * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также TransactionsPage.clear с
     * пустыми данными для того, чтобы очистить страницу.
     * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
     * либо обновляйте только виджет со счетами и формы создания дохода и расхода
     * для обновления приложения
     * */
    removeAccount() {
        //console.log('removeAccount',document.querySelector('.active').dataset.id);
        const answer = confirm('Вы действительно хотите удалить счёт?');
        if (answer) {
            this.clear();
            Account.remove({id: document.querySelector('.active').dataset.id}, (err, serverData) => {
                if (err) {
                    console.error('error');
                    return;
                }
                if (serverData.success) {
                    //console.log('removeAccount','ssss');

                    App.updateWidgets();
                    App.updateForms()

                } else if (!serverData.success) {
                    //console.log('removeAccount','ffff');
                }
            });

        }
    }

    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update(),
     * либо обновляйте текущую страницу (метод update) и виджет со счетами
     * */
    removeTransaction(id) {
        /* const answer = confirm('Вы действительно хотите удалить эту транзакцию?');
         if (answer) {
             Transaction.remove({ id : document.querySelector('.active').dataset.id},(err,serverData) => {
                 if (err) {
                     console.error('error');
                     return;
                 }
                 if (serverData.success) {
                     //console.log('removeAccount','ssss');

                     App.updateWidgets();
                     App.updateForms()

                 } else if(!serverData.success) {
                     //console.log('removeAccount','ffff');
                 }
             });
             //this.element.querySelector(`[data-id=${id}]`).closest('.transaction').remove();
             App.update();
         }*/
    }

    /**
     * С помощью Account.get() получает название счёта и отображает
     * его через TransactionsPage.renderTitle.
     * Получает список Transaction.list и полученные данные передаёт
     * в TransactionsPage.renderTransactions()
     * */
    render(options) {
        //console.log('render,options',options);
        if (options === null) {
            return;
        }
        this.lastOptions = options;
        Account.get(options.account_id, (err, serverData) => {
            if (err) {
                console.error(err);
                return;
            }
            if (serverData && serverData.success) {
                console.log('render', serverData);
                this.renderTitle(serverData.data.name);
            } else {
                console.log('Имя счёта не найдено');
            }
        });

        Transaction.list({id: options.account_id}, (err, serverData) => {

            if (err) {
                console.error(err);
                return;
            }
            if (serverData && serverData.success) {
                console.log('Transaction.list.render', serverData.data);
                this.renderTransactions(serverData.data);

            } else {
                console.log('Счета не найдены');
            }
        });
    }

    /**
     * Очищает страницу. Вызывает
     * TransactionsPage.renderTransactions() с пустым массивом.
     * Устанавливает заголовок: «Название счёта»
     * */
    clear() {
        this.renderTransactions([]);
        document.querySelector('.content-title').textContent = 'Название счёта';
    }

    /**
     * Устанавливает заголовок в элемент .content-title
     * */
    renderTitle(name) {
        document.querySelector('.content-title').textContent = name;
    }

    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20»
     * */
    formatDate(date) {
        /*console.log(date);
        const dateString = new Date(date.slice(0, 11));
        const timeString = date.slice(12, -4);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }

        return `${dateString.toLocaleString('ru', options)} в ${timeString}`;*/
    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {
        if (item.length === 0) {
            this.element.querySelector('.content').innerHTML = '';
            return;
        }

        const newTransaction = document.createElement('div');
        this.element.querySelector('.content').appendChild(newTransaction);
        newTransaction.insertAdjacentHTML('beforeend', `<div class="transaction transaction_${item['type']} row">
     <div class="col-md-7 transaction__details">
       <div class="transaction__icon">
           <span class="fa fa-money fa-2x"></span>
       </div>
       <div class="transaction__info">
           <h4 class="transaction__title">Новый будильник</h4>
           <div class="transaction__date">${this.formatDate(item['created_at'])}</div>
       </div>
     </div>
     <div class="col-md-3">
       <div class="transaction__summ">
           ${item['sum']} <span class="currency">₽</span>
       </div>
     </div>
     <div class="col-md-2 transaction__controls">
         <button class="btn btn-danger transaction__remove" data-id="${item['id']}">
             <i class="fa fa-trash"></i>
         </button>
     </div>
 </div>`);
    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {
        console.log('renderTransactions', data);
        if (data.length === 0) {
            this.getTransactionHTML(data);
        }
        for (let item of Object.keys(data)) {
            this.getTransactionHTML(item);
        }
    }
}