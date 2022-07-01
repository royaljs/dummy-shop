import { createContext } from 'react';
import { RouterStore } from 'mobx-react-router';
import ProductStore from './product/ProductStore';
import OrderStore from './order/OrderStore';

export class RootStore {
  routerStore;

  constructor() {
    this.routerStore = new RouterStore();
    this.productStore = new ProductStore(this);
    this.orderStore = new OrderStore(this);
  }
}

const stores = new RootStore();

export const StoreContext = createContext(stores);
