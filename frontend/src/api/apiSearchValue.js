import { useLocation } from 'react-router-dom';

// Функция для получения (парсинг) значения параметра из запроса

export default function ApiSearchValue(param) {
  const location = useLocation();
  if (!param) return '';
  const value = new URLSearchParams(location.search).get(param);
  return (value === undefined) ? '' : value;
}