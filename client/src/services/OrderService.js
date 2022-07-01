import { ApiClient } from '../utils/ApiClient';

const client = new ApiClient('http://localhost:3001'); //process.env.REACT_APP_BASE_URL
const PATH = 'shops';

export default {
  getOrder(shopId, orderId) {
    return client.get(`/shops/${shopId}/orders/${orderId}`).then((res) => {
      return res.data;
    });
  },

  createOrder(data) {
    const body = { dto: data };
    return client.post(`/${PATH}`, body);
  },

  modifyOrder(OrderId, data) {
    const body = { dto: data };
    return client.put(`/${PATH}/${OrderId}`, body);
  },

  deleteOrder(OrderId) {
    return client.delete(`/${PATH}/${OrderId}`).then((data) => {
      return data?.data.dto.id === OrderId;
    });
  },

  getOrderList(shopId) {
    return client.get(`/shops/${shopId}/orders`).then((res) => {
      return res.data;
    });
  },

  approveOrder(shopId, orderId) {
    return client.post(`/shops/${shopId}/orders/${orderId}/approve`);
  }
};
