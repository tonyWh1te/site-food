window.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.offer__slider'),
    slides = slider.querySelectorAll('.offer__slide'),
    sliderCounter = slider.querySelector('.offer__slider-counter'),
    btNext = sliderCounter.querySelector('.offer__slider-next'),
    btPrev = sliderCounter.querySelector('.offer__slider-prev'),
    curSlide = sliderCounter.querySelector('#current'),
    totalSlides = sliderCounter.querySelector('#total'),
    slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
    slidesField = slider.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    numSlides = slides.length;

  let slideNum = 1,
    offset = 0;

  //усложненный вариант слайдера
  curSlide.textContent = `0${slideNum}`;
  totalSlides.textContent = numSlides < 10 ? `0${numSlides}` : numSlides;

  changeStyle();

  slides.forEach((slide) => (slide.style.width = width));

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < numSlides; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  const changeOpacity = index => {
    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[index - 1].style.opacity = '1';
  };

  dots.forEach(dot => dot.addEventListener(('click'), (e) => {
    const slideIndex = e.target.getAttribute('data-slide-to');

    slideNum = slideIndex;
    offset = +width.slice(0, width.length - 2) * (slideNum - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;
    
    changeOpacity(slideIndex);
    
    slideCounter(curSlide, slideIndex);
  }));

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

    changeOpacity(slideNum);

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

    changeOpacity(slideNum);

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