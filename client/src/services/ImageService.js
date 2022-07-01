import { ApiClient } from '../utils/ApiClient';

const client = new ApiClient('http://localhost:3001'); // process.env.REACT_APP_IMAGE_URL

export default {
  getImages(product_id) {
    return client.get(`/images/product/${product_id}`).then((res) => {
      return res.data;
    });
  }
};
