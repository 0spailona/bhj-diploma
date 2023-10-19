/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    function callback(err, serverData){
      if (err) {
        console.error(err);
        return;
      }
      if (serverData.success){
        console.log('onSubmit',serverData);
        const modalName = 'createAccount';
        App.getModal(modalName).close();
        App.update();
      }
    }
    Account.create(data,callback);
  }
}