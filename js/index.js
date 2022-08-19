window.addEventListener('DOMContentLoaded', () => {
  const calc = require('./modules/calcScript'),
    formData = require('./modules/formData'),
    cards = require('./modules/scriptMenu'),
    modalWindow = require('./modules/scriptModal'),
    slider = require('./modules/scriptSlider'),
    tabs = require('./modules/scriptTabs'),
    timer = require('./modules/scriptTime');

  calc();
  formData();
  cards();
  modalWindow();
  slider();
  tabs();
  timer();
});
