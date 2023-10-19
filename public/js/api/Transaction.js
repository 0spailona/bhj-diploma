/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
static url = '/transaction';
}


Transaction.list({id: '3tzvvon1mwxlnucn0rv'},(err, serverData) => {
    if(serverData.success){
        console.log('мой вызов',serverData)
    }
})
