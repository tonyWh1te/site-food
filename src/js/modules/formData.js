'use strict';

import { closeModal, openModal } from './scriptModal';
import { postData } from '../services/services';

function formData(formSelector) {
  const forms = document.querySelectorAll(formSelector);

  //небольшое хранилище сообщений которые мы хотим показывать пользователю
  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => bindPostData(form));

  //привязка данных к форме
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); //отменяем стандартное поведение браузера(перезагрузка станицы)

      const messageElement = document.createElement('img');
      messageElement.src = message.loading;
      messageElement.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

      form.insertAdjacentElement('afterend', messageElement);

      // const request = new XMLHttpRequest();  устаревший вариант
      // request.open('POST', 'server.php');

      //request.setRequestHeader('Content-type', 'application/json');

      //XMLHttpRequest + FormData - заголовок не нужен
      //создается автоматически

      // const object = {};
      // formData.forEach((value, key) => {
      //     object[key] = value;
      // }); //переносим данные из formData в объект(только если нужно отправить данные в json)

      //request.send(formData); //отправка даных в формате formData
      // request.send(JSON.stringify(object));//отправка данных в формате JSON

      // request.addEventListener('load', () => {
      //     if (request.status === 200) {
      //         console.log(request.response);
      //         showThanksModal(message.success);
      //         form.reset(); //очищаем форму
      //         statusMessage.remove();//сообщение пропадает
      //     } else {
      //         showThanksModal(message.failure);
      //     }
      // });

      // fetch('server.php', { //современный вариант отправки данных в формате formData
      //     method: 'POST',
      //     body: formData
      // }).then(response => response.text())
      // .then(data => {  //обработка рез запроса
      //     console.log(data);
      //     showThanksModal(message.success);
      // }).catch(() => {
      //     showThanksModal(message.failure);
      // }).finally(() => form.reset()); //очищаем форму

      //создаем объект, который поможет нам сформировать данные из заполненной формы
      //ВАЖНО: при использовании formData в верстке в input указывать атрибут name, чтобы он смог найти этот input
      const formData = new FormData(form);

      //сначала объект formData превращаем в массив с массивами, затем превращаем в объект, а затем в json
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          messageElement.remove();
        })
        .catch(() => showThanksModal(message.failure))
        .finally(() => form.reset());
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'),
      modal = document.querySelector('.modal');

    prevModalDialog.classList.add('hide');
    openModal('.modal');

    const newModalDialog = document.createElement('div');
    newModalDialog.classList.add('modal__dialog');

    newModalDialog.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    modal.append(newModalDialog);

    setTimeout(() => {
      newModalDialog.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModal('.modal');
    }, 4000);
  }
}

export default formData;
