import { makeAutoObservable } from 'mobx';

export default class Order {
  id = '';
  shop_id = '';
  name = '';
  price = 0;
  description = '';
  image_urls = [];

  constructor(options) {
    makeAutoObservable(this);
    const {
      id,
      user_id,
      shop_id,
      total_amount,
      price_amount,
      tax_amount,
      discount_amount,
      description,
      status,
      created_at
    } = options;
   
    this.id = id;
    this.user_id = user_id;
    this.shop_id = shop_id;
    this.total_amount = total_amount;
    this.price_amount = price_amount;
    this.tax_amount = tax_amount;
    this.discount_amount = discount_amount;
    this.description = description;
    this.status = status;
    this.created_at = created_at;
  }
}
