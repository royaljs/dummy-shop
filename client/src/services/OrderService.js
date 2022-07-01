import { ApiClient } from '../utils/ApiClient';

const client = new ApiClient('http://localhost:3001'); //process.env.REACT_APP_BASE_URL
const PATH = 'shop';

export default {
  getOrder(shopId) {
    return client.get(`/orders/${shopId}`).then((res) => {
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
    return client.get(`/orders/${shopId}`).then((res) => {
      return res.data;
    });
  }
};
