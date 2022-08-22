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

export { postData, getResource };
