import { ApiClient } from '../utils/ApiClient';

const client = new ApiClient('http://localhost:3001'); //process.env.REACT_APP_BASE_URL
const PATH = 'shops';

export default {
  getProduct(shopId) {
    return client.get(`/shops/${shopId}/product`).then((data) => {
      return data?.data.dto;
    });
  },

  createProduct(data) {
    const body = { dto: data };
    return client.post(`/${PATH}`, body);
  },

  modifyProduct(ProductId, data) {
    const body = { dto: data };
    return client.put(`/${PATH}/${ProductId}`, body);
  },

  deleteProduct(ProductId) {
    return client.delete(`/${PATH}/${ProductId}`).then((data) => {
      return data?.data.dto.id === ProductId;
    });
  },

  getProductList(shopId) {
    return client.get(`/shops/${shopId}/product`).then((res) => {
      return res.data;
    });
  }
};
