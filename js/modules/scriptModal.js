function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; //запрещаем скролить страницу
  //clearInterval(modalTimerID);
}

function modalWindow(triggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) =>
    btn.addEventListener('click', () => openModal(modalSelector))
  );

  modal.addEventListener('click', (e) => {
    //событие при котором окно закрывается при клике на область вокруг окна или на крестик
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    //закрытие окна при нажатии Esc
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', showModalByScroll);

  //const modalTimerID = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      //то, сколько мы пролистали + то, сколько мы на данный момент видим >= высоты всего окна с прокруткой
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}

export default modalWindow;
export { closeModal, openModal };
