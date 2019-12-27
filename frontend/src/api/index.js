// Общее API для отправки запросов на сервер

export default class Api {
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }

  static async sendData(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(response.statusText);
    return true;
  }

  static async fetchHitsSales() {
    return Api.fetchData(process.env.REACT_APP_HITS_SALES_URL);
  }

  static async fetchCatalogCategories() {
    return Api.fetchData(process.env.REACT_APP_CATALOG_CATEGORIES_URL);
  }

  static async fetchCatalogItems(params = {}) {
    const search = new URLSearchParams(params);
    return Api.fetchData(`${process.env.REACT_APP_CATALOG_ITEMS_URL}?${search}`);
  }

  static async fetchCatalogItem(id) {
    return Api.fetchData(`${process.env.REACT_APP_CATALOG_ITEMS_URL}/${id}`);
  }

  static async sendCart(data) {
    return Api.sendData(process.env.REACT_APP_CART_URL, data);
  }
}