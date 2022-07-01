import { makeAutoObservable } from 'mobx';
import Order from './Order';
import OrderClient from '../../services/OrderService';

export default class OrderStore {
  orderList = [];
  order = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.initialize();
  }

  initialize() {
    //TODO: Shop 로그인한 계정에 따라 shop_id를 다르게 주기
    OrderClient.getOrderList('12950ae2-767b-4671-81fa-09159349918e') // process.env.SHOP_ID
      .then((data) => {
        const orderList = [];
        data.forEach((c) => {
          const order = new Order({
            id: c.id,
            user_id: c.user_id,
            shop_id: c.shop_id,
            total_amount: c.total_amount,
            price_amount: c.price_amount,
            tax_amount: c.tax_amount,
            discount_amount: c.discount_amount,
            description: c.description,
            status: c.status
          });
          orderList.push(order);
        });
        this.setOrderList(orderList);
      })
      .catch((err) => {
        console.log(err);
        window.console.error('데이터를 불러오는데 실패했습니다.');
      });
  }

  get(id) {
    OrderClient.getOrder(id).then((data) => {
      this.setOrder(new Order(data));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  delete(id) {
    return OrderClient.deleteOrder(id).then((data) => {
      return data;
    });
  }

  setOrderList(newOrderList) {
    this.orderList = newOrderList;
  }

  setOrder(newOrder) {
    this.order = newOrder;
  }
}
