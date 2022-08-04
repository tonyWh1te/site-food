'use strict';

import {openModal, closeModal}  from './scriptModal.js';

// const forms = document.querySelectorAll('form');

// const message = { //небольшое хранилище сообщений которые мы хотим показывать пользователю
//     loading: 'icons/spinner.svg',
//     success: 'Спасибо! Скоро мы с вами свяжемся',
//     failure: 'Что-то пошло не так...'
// };

// forms.forEach(form => bindpostData(form));

// //получили содержимое меню от сервера
// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(data => console.log(data)); 

// //ф-я настраивает запрос, отправляет, получает ответ и декодирует из json
// const postData = async (url, data) => {
//     const res = await fetch(url, {  //современный вариант отправки данных в формате json
//         method: 'POST', 
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: data
//     });

//     return await res.json();
// };
// //async говорит что в ф-ии будет асинхронный код,
// //который вернет промис, await говорит, что надо подождать пока выполнится запрос и возвращает результат промиса
// //и только после этого присвоить переменной рез запроса
// //без этих слов наш код бы выполняелся асинхронно и res присвоилось изначально ничего, тк от сервера еще ответ не придет

//функция привязки данных к форме
// function bindpostData (form) {
//     form.addEventListener('submit', e => {
//         e.preventDefault(); //отменяем стандартное поведение браузера(перезагрузка станицы)

//         const statusMessage = document.createElement('img');
//         statusMessage.src = message.loading;
//         statusMessage.style.cssText = `
//             display: block;
//             margin: 0 auto;
//         `;
//        form.append(statusMessage);

//         // const request = new XMLHttpRequest();  устаревший вариант
//         // request.open('POST', 'server.php');


//         //request.setRequestHeader('Content-type', 'application/json');
//         //request.setRequestHeader('Content-type', 'multipart/form-data');//XMLHttpRequest + FormData - заголовок не нужен
//         //создается автоматически

//         const formData = new FormData(form); //создаем объект, который поможет нам сформировать данные из заполненной формы
//         //ВАЖНО: при использовании formData в верстке в input указывать атрибут name, чтобы он смог найти этот input
        
//         // const object = {};
//         // formData.forEach((value, key) => {
//         //     object[key] = value;
//         // }); //переносим данные из formData в объект(только если нужно отправить данные в json)

//         //request.send(formData); //отправка даных в формате formData
//        // request.send(JSON.stringify(object));//отправка данных в формате JSON

//         // request.addEventListener('load', () => {
//         //     if (request.status === 200) {
//         //         console.log(request.response);
//         //         showThanksModal(message.success);
//         //         form.reset(); //очищаем форму
//         //         statusMessage.remove();//сообщение пропадает
//         //     } else {
//         //         showThanksModal(message.failure);
//         //     }
//         // });



//         // fetch('server.php', { //современный вариант отправки данных в формате formData
//         //     method: 'POST', 
//         //     body: formData
//         // }).then(response => response.text())
//         // .then(data => {  //обработка рез запроса
//         //     console.log(data);
//         //     showThanksModal(message.success);
//         // }).catch(() => {
//         //     showThanksModal(message.failure);
//         // }).finally(() => form.reset()); //очищаем форму
        
//         //сначала объект formData превращаем в массив с массивами, затем превращаем в объект, а затем в json
//         const json = JSON.stringify(Object.fromEntries(formData.entries()));

//         postData('http://localhost:3000/requests', json)
//         .then(data => {  //обработка рез запроса
//             console.log(data);
//             showThanksModal(message.success);
//         }).catch(() => {
//             showThanksModal(message.failure);
//         }).finally(() => form.reset()); //очищаем форму
//     });
// }

// function showThanksModal(message) {
//     const prevModalDialog = document.querySelector('.modal__dialog');

//     prevModalDialog.classList.add('hide');
//     const modal = document.querySelector('.modal');
//     openModal(modal);

//     const thanksModal = document.createElement('div');
//     thanksModal.classList.add('modal__dialog');
//     thanksModal.innerHTML = `
//         <div class="modal__content">
//             <div data-close class="modal__close">&times;</div>
//             <div class="modal__title">${message}</div>
//         </div>
//     `;

//     modal.append(thanksModal);
//     setTimeout(() =>{
//         thanksModal.remove();
//         prevModalDialog.classList.add('show');
//         prevModalDialog.classList.remove('hide');
//         closeModal(modal);
//     }, 4000);
// }


document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => bindPostData(form));

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: data
    });

    return await result.json();
  };

  //привязка данных к форме
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const messageElement = document.createElement('img');
      messageElement.src = message.loading;
      messageElement.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

      form.insertAdjacentElement('afterend', messageElement);

      const formData = new FormData(form);

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
    openModal(modal);

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
      closeModal(modal);
    }, 4000);
  }
});
