import calc from './modules/calcScript';
import formData from './modules/formData';
import cards from './modules/scriptMenu';
import modalWindow from './modules/scriptModal';
import slider from './modules/scriptSlider';
import tabs from './modules/scriptTabs';
import timer from './modules/scriptTime';

window.addEventListener('DOMContentLoaded', () => {
  calc();
  formData('form');
  cards();
  modalWindow('[data-modal]', '.modal');
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    sliderCounterParent: '.offer__slider-counter',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader',
    'tabheader__item_active'
  );
  timer('.timer', new Date(2022, 6, 21, 17, 34));
});
