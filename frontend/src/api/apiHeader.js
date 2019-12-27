// Сериализация объекта в строку запроса

export const getUrl = (path, q = '') => {
  if (!path) return;
  const search = q ? new URLSearchParams({q}).toString() : '';
  return `${path}?${search}`;
};