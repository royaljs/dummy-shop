import { makeAutoObservable } from 'mobx';
import Product from './Product';
import ProductClient from '../../services/ProductService';
import ImageClient from '../../services/ImageService';

export default class ProductStore {
  productList = [];
  product = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.initialize();
  }

  initialize() {
    //TODO: Shop 로그인한 계정에 따라 shop_id를 다르게 주기
    ProductClient.getProductList('12950ae2-767b-4671-81fa-09159349918e') // process.env.SHOP_ID
      .then(async (data) => {
        const productList = [];
        for (const c of data) {
          //forEach문 안에서는 async/await가 동작하지 않아서 for문 사용
          await this.getImages(c.id).then((image_urls) => {
            const product = new Product({
              id: c.id,
              shop_id: c.shop_id,
              name: c.name,
              price: c.price,
              description: c.description,
              image_urls: image_urls
            });
            productList.push(product);
          });
        }
        this.setProductList(productList);
      })
      .catch((err) => {
        console.log(err);
        window.console.error('데이터를 불러오는데 실패했습니다.');
      });
  }

  get(id) {
    ProductClient.getProduct(id).then((data) => {
      this.setProduct(new Product(data));
    });
  }

  getImages(id) {
    return ImageClient.getImages(id).then((data) => {
      const imageUrls = [];
      data.image_ids.forEach((image_id) => {
        imageUrls.push(`http://localhost:3001/images/${image_id}`);
      });
      //console.log(imageUrls[0])
      return imageUrls;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  delete(id) {
    return ProductClient.deleteProduct(id).then((data) => {
      return data;
    });
  }

  setProductList(newProductList) {
    this.productList = newProductList;
  }

  setProduct(newProduct) {
    this.product = newProduct;
  }
}
