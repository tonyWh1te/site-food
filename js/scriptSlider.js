window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.offer__slide'),
    sliderCounter = document.querySelector('.offer__slider-counter'),
    btNext = sliderCounter.querySelector('.offer__slider-next'),
    btPrev = sliderCounter.querySelector('.offer__slider-prev'),
    curSlide = sliderCounter.querySelector('#current'),
    totalSlides = sliderCounter.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    numSlides = slides.length;

  let slideNum = 1,
    offset = 0;

  //усложненный вариант слайдера
  curSlide.textContent = `0${slideNum}`;
  totalSlides.textContent = numSlides < 10 ? `0${numSlides}` : numSlides;

  changeStyle();

  slides.forEach((slide) => (slide.style.width = width));

  const slideCounter = (element, count) =>
    (element.textContent = count >= 10 ? `${count}` : `0${count}`);

  btNext.addEventListener('click', () => {
    slideNum++;

    if (offset === +width.slice(0, width.length - 2) * (numSlides - 1)) {
      offset = 0;
      slideNum = 1;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideCounter(curSlide, slideNum);
  });

  btPrev.addEventListener('click', () => {
    slideNum--;

    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (numSlides - 1);
      slideNum = numSlides;
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideCounter(curSlide, slideNum);
  });

  function changeStyle() {
    slidesField.style.width = 100 * numSlides + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
  }

  //Простой вариант слайдера
  // curSlide.textContent = `0${slideNum}`;
  // totalSlides.textContent = numSlides < 10 ? `0${numSlides}` : numSlides;

  // showElement(slides);

  // const slideCounter = (element, count) =>
  //   (element.textContent = count >= 10 ? `${count}` : `0${count}`);

  // btNext.addEventListener('click', () => {
  //   if (++slideNum > slides.length) {
  //     slideNum = 1;
  //   }

  //   slideSwitcher(slideNum - 1);

  //   slideCounter(curSlide, slideNum);
  // });

  // btPrev.addEventListener('click', () => {
  //   if (--slideNum < 1) {
  //     slideNum = slides.length;
  //   }

  //   slideSwitcher(slideNum - 1);

  //   slideCounter(curSlide, slideNum);
  // });

  // function showElement(elements, index = 0) {
  //   elements.forEach((element, i) => {
  //       if (i === index) {
  //         element.classList.remove('hide');
  //         element.classList.add('show');
  //       } else {
  //         element.classList.add('hide');
  //       }
  //   });
  // }

  // function slideSwitcher(index) {
  //   showElement(slides, index);
  // }
});