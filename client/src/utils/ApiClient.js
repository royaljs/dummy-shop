import axios from 'axios';

const getClient = (baseUrl) => {
  const options = {
    baseURL: baseUrl
  };

  const client = axios.create(options);

  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
    this.request = {};
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export { ApiClient };
