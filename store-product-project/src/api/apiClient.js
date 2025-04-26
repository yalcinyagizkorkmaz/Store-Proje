import axios from "axios";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response;

    switch (status) {
      case 400:
        toast.error(data.message);
        break;
      case 401:
        toast.error(data.message);
        break;
      case 403:
        if (data.errors) {
          const errors = [];

          for (const key in data.errors) {
            errors.push(data.errors[key]);
          }

          let result = { errors: errors, message: data.message };
          throw result;
        }
        break;
      case 404:
        history.push("/errors/not-found");
        break;
      case 500:
        history.push("/errors/server-error", {
          state: { error: data, status: status },
        });
        break;
      default:
        break;
    }

    return Promise.reject(error.message);
  }
);

const methods = {
  get: (url) => axios.get(url).then((response) => response.data),
  post: (url, body) => axios.post(url, body).then((response) => response.data),
  put: (url, body) => axios.put(url, body).then((response) => response.data),
  delete: (url) => axios.delete(url).then((response) => response.data),
};

const products = {
  list: () => methods.get("/products"),
  details: (id) => methods.get(`/products/${id}`),
};

const errors = {
  get400Error: () =>
    methods.get("/errors/bad-request").catch((error) => console.log(error)),
  get401Error: () =>
    methods.get("/errors/unauthorized").catch((error) => console.log(error)),
  get403Error: () => methods.get("/errors/validation-error"),
  get404Error: () =>
    methods.get("/errors/not-found").catch((error) => console.log(error)),
  get500Error: () =>
    methods.get("/errors/server-error").catch((error) => console.log(error)),
};

const cart = {
  get: () => methods.get("/carts"),
  addItem: (productId, quantity = 1) =>
    methods.post(`/carts?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId, quantity = 1) =>
    methods.delete(`/carts?productId=${productId}&quantity=${quantity}`),
};

const account = {
  login: (formData) => methods.post("/users/login", formData),
  register: (formData) => methods.post("/users/register", formData),
  getUser: () => methods.get("/users/getUser"),
};

const requests = {
  products,
  errors,
  cart,
  account,
};

export default requests;

