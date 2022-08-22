/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './js/modules/calcScript.js':
      /*!**********************************!*\
  !*** ./js/modules/calcScript.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function calc() {
          const SMALL_ACTIVITY_VAL = 1.375;

          let sex = localStorage.getItem('sex')
              ? localStorage.getItem('sex')
              : 'female',
            height,
            weight,
            age,
            activityLevel = localStorage.getItem('activ')
              ? localStorage.getItem('activ')
              : SMALL_ACTIVITY_VAL;

          const result = document.querySelector('.calculating__result span');

          localStorage.setItem('sex', sex);
          localStorage.setItem('activ', activityLevel);

          initialActivity('#gender', 'calculating__choose-item_active');
          initialActivity(
            '.calculating__choose_big',
            'calculating__choose-item_active'
          );

          calcCalorie();

          getValFromButtons('#gender', 'calculating__choose-item_active');
          getValFromButtons(
            '.calculating__choose_big',
            'calculating__choose-item_active'
          );
          getValFromInput('.calculating__choose_medium');

          function initialActivity(selector, activityClass) {
            const elements = document.querySelectorAll(`${selector} div`);

            elements.forEach((element) => {
              const elementData = element.dataset;

              element.classList.remove(activityClass);

              if (
                elementData.gender === localStorage.getItem('sex') ||
                elementData.activ === localStorage.getItem('activ')
              ) {
                element.classList.add(activityClass);
              }
            });
          }

          function calcCalorie() {
            if (!sex || !height || !weight || !age || !activityLevel) {
              result.textContent = '___';
              return;
            }

            result.textContent =
              sex === 'female'
                ? Math.round(
                    (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) *
                      activityLevel
                  )
                : Math.round(
                    (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) *
                      activityLevel
                  );
          }

          const activitySwitching = (
            activityClass,
            elements,
            activeElement
          ) => {
            elements.forEach((element) =>
              element.classList.remove(activityClass)
            );

            activeElement.classList.add(activityClass);
          };

          function getValFromButtons(parent, activityClass) {
            const elements = document.querySelectorAll(`${parent} div`);

            document.querySelector(parent).addEventListener('click', (e) => {
              const target = e.target;

              if (target.dataset.gender) {
                sex = target.dataset.gender;

                localStorage.setItem('sex', sex);

                activitySwitching(activityClass, elements, e.target);
                calcCalorie();
              } else if (target.id) {
                switch (target.id) {
                  case 'low':
                    activityLevel = +target.dataset.activ;
                    break;
                  case 'small':
                    activityLevel = +target.dataset.activ;
                    break;
                  case 'medium':
                    activityLevel = +target.dataset.activ;
                    break;
                  case 'high':
                    activityLevel = +target.dataset.activ;
                    break;
                }

                localStorage.setItem('activ', target.dataset.activ);

                activitySwitching(activityClass, elements, e.target);
                calcCalorie();
              }
            });
          }

          function getValFromInput(parent) {
            const elements = document.querySelectorAll(`${parent} input`);

            elements.forEach((element) => {
              element.addEventListener('input', (e) => {
                const target = e.target;

                target.style.border = target.value.match(/\D/g)
                  ? '1.5px solid red'
                  : 'none';

                switch (target.id) {
                  case 'height':
                    height = +target.value;
                    break;
                  case 'weight':
                    weight = +target.value;
                    break;
                  case 'age':
                    age = +target.value;
                    break;
                }

                calcCalorie();
              });
            });
          }
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = calc;

        /***/
      },

    /***/ './js/modules/formData.js':
      /*!********************************!*\
  !*** ./js/modules/formData.js ***!
  \********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _scriptModal__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./scriptModal */ './js/modules/scriptModal.js'
          );
        /* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../services/services */ './js/services/services.js'
          );

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
              const json = JSON.stringify(
                Object.fromEntries(formData.entries())
              );

              (0, _services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(
                'http://localhost:3000/requests',
                json
              )
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
            (0, _scriptModal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

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
              (0, _scriptModal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(
                '.modal'
              );
            }, 4000);
          }
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          formData;

        /***/
      },

    /***/ './js/modules/scriptMenu.js':
      /*!**********************************!*\
  !*** ./js/modules/scriptMenu.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../services/services */ './js/services/services.js'
          );

        function cards() {
          class Menu {
            //для шаблонизации элементов меню
            constructor(
              src,
              altText,
              title,
              text,
              price,
              parentSelector,
              ...classes
            ) {
              this.src = src;
              this.altText = altText;
              this.title = title;
              this.text = text;
              this.price = price;
              this.classes = classes; // для добавления других классов
              this.parent = document.querySelector(parentSelector);
              this.transfer = 56;
              this.changeToRUB();
            }

            changeToRUB() {
              //конвертируем из доллара в руб
              this.price *= this.transfer;
            }

            render() {
              let classes = '';

              if (this.classes.length > 0) {
                classes = this.classes.join(' ');
              }

              this.parent.insertAdjacentHTML(
                'beforeend',
                `               
                <div class="menu__item ${classes}">
                    <img src=${this.src} alt=${this.altText}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `
              );
            }
          }

          //сделали гет запрос с помощью библиотеки axios
          //axios.get заменит нам метод getResource
          // axios.get('http://localhost:3000/menu')
          //     .then(data => { //получаем массив объектов
          //         data.data.forEach(({img, altimg, title, descr, price}) => { //деструктурируем объект
          //             new Menu(img, altimg, title, descr, price, '.menu .container', 'big').render();
          //         });
          //     })
          //     .catch((e) => alert(e));

          (0, _services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(
            'http://localhost:3000/menu'
          )
            .then((data) => {
              //получаем массив объектов
              data.forEach(({ img, altimg, title, descr, price }) => {
                //деструктурируем объект
                new Menu(
                  img,
                  altimg,
                  title,
                  descr,
                  price,
                  '.menu .container',
                  'big'
                ).render();
              });
            })
            .catch(alert);

          //   new Menu(
          //     'img/tabs/vegy.jpg',
          //     'vegy',
          //     "Меню 'Фитнес'",
          //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          //     9,
          //     '.menu .container'
          //   ).render();

          //   new Menu(
          //     'img/tabs/vegy.jpg',
          //     'vegy',
          //     "Меню 'Фитнес'",
          //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          //     9,
          //     '.menu .container'
          //   ).render();

          //   new Menu(
          //     'img/tabs/vegy.jpg',
          //     'vegy',
          //     "Меню 'Фитнес'",
          //     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          //     9,
          //     '.menu .container'
          //   ).render();
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = cards;

        /***/
      },

    /***/ './js/modules/scriptModal.js':
      /*!***********************************!*\
  !*** ./js/modules/scriptModal.js ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ closeModal: () => /* binding */ closeModal,
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */ openModal: () => /* binding */ openModal,
          /* harmony export */
        });
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
            if (
              e.target === modal ||
              e.target.getAttribute('data-close') == ''
            ) {
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          modalWindow;

        /***/
      },

    /***/ './js/modules/scriptSlider.js':
      /*!************************************!*\
  !*** ./js/modules/scriptSlider.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function slider({
          container,
          slide,
          sliderCounterParent,
          nextArrow,
          prevArrow,
          totalCounter,
          currentCounter,
          wrapper,
          field,
        }) {
          const slider = document.querySelector(container),
            slides = slider.querySelectorAll(slide),
            sliderCounter = slider.querySelector(sliderCounterParent),
            btNext = sliderCounter.querySelector(nextArrow),
            btPrev = sliderCounter.querySelector(prevArrow),
            curSlide = sliderCounter.querySelector(currentCounter),
            totalSlides = sliderCounter.querySelector(totalCounter),
            slidesWrapper = slider.querySelector(wrapper),
            slidesField = slider.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width,
            numSlides = slides.length;

          let slideNum = 1,
            offset = 0;

          //усложненный вариант слайдера
          curSlide.textContent = `0${slideNum}`;
          totalSlides.textContent =
            numSlides < 10 ? `0${numSlides}` : numSlides;

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

          const changeOpacity = (index) => {
            dots.forEach((dot) => (dot.style.opacity = '.5'));
            dots[index - 1].style.opacity = '1';
          };

          dots.forEach((dot) =>
            dot.addEventListener('click', (e) => {
              const slideIndex = e.target.getAttribute('data-slide-to');

              slideNum = slideIndex;
              offset = getWidthSlide(width) * (slideNum - 1);

              slidesField.style.transform = `translateX(-${offset}px)`;

              changeOpacity(slideIndex);

              slideCounter(curSlide, slideIndex);
            })
          );

          const slideCounter = (element, count) =>
            (element.textContent = count >= 10 ? `${count}` : `0${count}`);

          const getWidthSlide = (str) => +str.replace(/[^\d.]/g, '');

          btNext.addEventListener('click', () => {
            slideNum++;

            if (offset === getWidthSlide(width) * (numSlides - 1)) {
              offset = 0;
              slideNum = 1;
            } else {
              offset += getWidthSlide(width);
            }

            changeOpacity(slideNum);

            slidesField.style.transform = `translateX(-${offset}px)`;

            slideCounter(curSlide, slideNum);
          });

          btPrev.addEventListener('click', () => {
            slideNum--;

            if (offset === 0) {
              offset = getWidthSlide(width) * (numSlides - 1);
              slideNum = numSlides;
            } else {
              offset -= getWidthSlide(width);
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
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = slider;

        /***/
      },

    /***/ './js/modules/scriptTabs.js':
      /*!**********************************!*\
  !*** ./js/modules/scriptTabs.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function tabs(
          tabsSelector,
          tabsContentSelector,
          tabsParentSelector,
          activClass
        ) {
          const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

          hideTabContent();
          showTabContent();

          function hideTabContent() {
            tabsContent.forEach((tabCon) => {
              tabCon.classList.add('hide');
              tabCon.classList.remove('show', 'fade');
            });

            tabs.forEach((tabBtn) => tabBtn.classList.remove(activClass));
          }

          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activClass);
          }

          tabsParent.addEventListener('click', (e) => {
            const target = e.target;

            if (target && target.classList.contains(tabsSelector.slice(1))) {
              tabs.forEach((item, i) => {
                if (item == target) {
                  hideTabContent();
                  showTabContent(i);
                }
              });
            }
          });
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = tabs;

        /***/
      },

    /***/ './js/modules/scriptTime.js':
      /*!**********************************!*\
  !*** ./js/modules/scriptTime.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function timer(parentSelector, deadline) {
          const getZero = (num) => (num >= 0 && num < 10 ? `0${num}` : num);

          setTime(parentSelector, deadline);

          function timing(endTime) {
            let t, days, hours, minutes, seconds;

            //ф-я определяет разницу между тек временем и дедлайном
            t = Date.parse(endTime) - Date.now();

            if (t < 0) {
              const coef = Math.floor(t / (1000 * 60 * 60 * 24));
              //если время выйдет, прибавлем еще сутки
              t += 1000 * 60 * 60 * 24 * -coef;
            }

            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);

            return {
              t,
              days,
              hours,
              minutes,
              seconds,
            };
          }

          function setTime(selector, endTime) {
            //присваиваем элементам часов новые значения
            const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');

            setInterval(updateClock, 1000);

            updateClock(); //чтобы при обновлении стр он сразу обновлял время, а не подставлял из верстки

            function updateClock() {
              //обновляем посекундно часы
              const t = timing(endTime);

              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);
            }
          }
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = timer;

        /***/
      },

    /***/ './js/services/services.js':
      /*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getResource: () => /* binding */ getResource,
          /* harmony export */ postData: () => /* binding */ postData,
          /* harmony export */
        });
        //ф-я настраивает запрос, отправляет, получает ответ и декодирует из json
        const postData = async (url, data) => {
          const result = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: data,
          });

          return await result.json();
        };
        //async говорит что в ф-ии будет асинхронный код,
        //который вернет промис, await говорит, что надо подождать пока выполнится запрос и возвращает результат промиса
        //и только после этого присвоить переменной рез запроса
        //без этих слов наш код бы выполняелся асинхронно и res присвоилось изначально ничего, тк от сервера еще ответ не придет

        const getResource = async (url) => {
          const res = await fetch(url);

          //обрабатываем появление ошибки, так как fetch этого не умеет
          if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }

          return await res.json();
        };

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _modules_calcScript__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./modules/calcScript */ './js/modules/calcScript.js'
      );
    /* harmony import */ var _modules_formData__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./modules/formData */ './js/modules/formData.js');
    /* harmony import */ var _modules_scriptMenu__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./modules/scriptMenu */ './js/modules/scriptMenu.js'
      );
    /* harmony import */ var _modules_scriptModal__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(
        /*! ./modules/scriptModal */ './js/modules/scriptModal.js'
      );
    /* harmony import */ var _modules_scriptSlider__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(
        /*! ./modules/scriptSlider */ './js/modules/scriptSlider.js'
      );
    /* harmony import */ var _modules_scriptTabs__WEBPACK_IMPORTED_MODULE_5__ =
      __webpack_require__(
        /*! ./modules/scriptTabs */ './js/modules/scriptTabs.js'
      );
    /* harmony import */ var _modules_scriptTime__WEBPACK_IMPORTED_MODULE_6__ =
      __webpack_require__(
        /*! ./modules/scriptTime */ './js/modules/scriptTime.js'
      );

    window.addEventListener('DOMContentLoaded', () => {
      (0, _modules_calcScript__WEBPACK_IMPORTED_MODULE_0__['default'])();
      (0, _modules_formData__WEBPACK_IMPORTED_MODULE_1__['default'])('form');
      (0, _modules_scriptMenu__WEBPACK_IMPORTED_MODULE_2__['default'])();
      (0, _modules_scriptModal__WEBPACK_IMPORTED_MODULE_3__['default'])(
        '[data-modal]',
        '.modal'
      );
      (0, _modules_scriptSlider__WEBPACK_IMPORTED_MODULE_4__['default'])({
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
      (0, _modules_scriptTabs__WEBPACK_IMPORTED_MODULE_5__['default'])(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader',
        'tabheader__item_active'
      );
      (0, _modules_scriptTime__WEBPACK_IMPORTED_MODULE_6__['default'])(
        '.timer',
        new Date(2022, 6, 21, 17, 34)
      );
    });
  })();

  /******/
})();
//# sourceMappingURL=bundle.js.map
