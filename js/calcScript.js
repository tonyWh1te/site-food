window.addEventListener('DOMContentLoaded', () => {
  const LOW_ACTIVITY_VAL = 1.2,
    SMALL_ACTIVITY_VAL = 1.375,
    MEDIUM_ACTIVITY_VAL = 1.55,
    HIGH_ACTIVITY_VAL = 1.725;

  let sex = 'female',
    height,
    weight,
    age,
    activityLevel = 1.375;

  const result = document.querySelector('.calculating__result span');

  calcCalorie();

  getValFromButtons('#gender', 'calculating__choose-item_active');
  getValFromButtons(
    '.calculating__choose_big',
    'calculating__choose-item_active'
  );
  getValFromInput('.calculating__choose_medium');

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
      const targetData = e.target.dataset;

      if ('gender' in targetData) {
        sex = targetData.gender;
        activitySwitching(activityClass, elements, e.target);
        calcCalorie();
      } else if ('activ' in targetData) {
        switch (targetData.activ) {
          case 'low':
            activityLevel = LOW_ACTIVITY_VAL;
            break;
          case 'small':
            activityLevel = SMALL_ACTIVITY_VAL;
            break;
          case 'medium':
            activityLevel = MEDIUM_ACTIVITY_VAL;
            break;
          case 'high':
            activityLevel = HIGH_ACTIVITY_VAL;
            break;
        }

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
});
