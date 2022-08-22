import { getResource } from '../services/services';

function cards() {
  class Menu {
    //для шаблонизации элементов меню
    constructor(src, altText, title, text, price, parentSelector, ...classes) {
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

  getResource('http://localhost:3000/menu')
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

export default cards;
