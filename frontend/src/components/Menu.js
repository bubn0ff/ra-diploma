export const links = [
  { url: '/', title: 'Главная' },
  { url: '/about', title: 'О магазине' },
  { url: '/catalog', title: 'Каталог' },
  { url: '/contacts', title: 'Контакты' }
];

export function getLinks(link, indexOfArray) {
  return link.slice(indexOfArray);
}