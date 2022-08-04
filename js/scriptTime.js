window.addEventListener('DOMContentLoaded', () => {
  const deadline = new Date(2022, 6, 21, 17, 34);

  const getZero = (num) => (num >= 0 && num < 10 ? `0${num}` : num);

  setTime('.timer', deadline);

  function timing(endTime) {
    let t, days, hours, minutes, seconds;

    //ф-я определяет разницу между тек временем и дедлайном
    t = Date.parse(endTime) - Date.now();

    if (t < 0) {
      const coef = Math.floor(t / (1000 * 60 * 60 * 24));
      //если время выйдет, прибавлем еще сутки
      t += 1000 * 60 * 60 * 24 * (-coef);
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
});
