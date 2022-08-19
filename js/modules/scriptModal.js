function modalWindow() {
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  modalTrigger.forEach((btn) =>
    btn.addEventListener('click', () => openModal(modal))
  );

  modal.addEventListener('click', (e) => {
    //событие при котором окно закрывается при клике на область вокруг окна или на крестик
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    //закрытие окна при нажатии Esc
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modal);
    }
  });

  window.addEventListener('scroll', showModalByScroll);

  // function closeModal(modal) {
  //     modal.classList.toggle('show');
  //     document.body.style.overflow = '';
  // }

  //const modalTimerID = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      //то, сколько мы пролистали + то, сколько мы на данный момент видим >= высоты всего окна с прокруткой
      openModal(modal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  function openModal(modal) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; //запрещаем скролить страницу
    //clearInterval(modalTimerID);
  }
}

module.exports = modalWindow;
