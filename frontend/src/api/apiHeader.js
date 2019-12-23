// Сериализация объекта в строку запроса
export const getUrl = (path, q) => {
  if (q) {
    const search = q ? queryString({ q }) : '';
    return `${path}?${search}`;
  }

  return path;
};

/* Получаем массив пар ключ-значение, фильтруем неопределёнку, 
/* кодируем ключи и значения, удаляем нулевое значение и оставляем ключ */
const queryString = (query = {}) => {
  return Object.entries(query)
    .filter(o => o[1] !== undefined)
    .map(o => o.filter(i => i !== null).map(encodeURIComponent).join('='))
    .join('&');
}