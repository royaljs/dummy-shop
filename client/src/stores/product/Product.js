import { makeAutoObservable } from 'mobx';

export default class Product {
  id = '';
  shop_id = '';
  name = '';
  price = 0;
  description = '';
  image_urls = [];

  constructor(options) {
    makeAutoObservable(this);
    const { id, shop_id, name, price, description, image_urls } = options;
    this.id = id;
    this.shop_id = shop_id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image_urls = image_urls;
  }
}
