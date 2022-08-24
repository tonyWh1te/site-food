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
            (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activityLevel
          )
        : Math.round(
            (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activityLevel
          );
  }

  const activitySwitching = (activityClass, elements, activeElement) => {
    elements.forEach((element) => element.classList.remove(activityClass));

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

export default calc;
