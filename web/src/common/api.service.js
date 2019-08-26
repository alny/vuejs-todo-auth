import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "./config";
import JwtService from "./jwt.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common["jwt_token"] = `${JwtService.getToken()}`;
  },

  query(resource) {
    return Vue.axios.get(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource) {
    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const TaskService = {
  query() {
    return ApiService.query("task");
  },
  get(id) {
    return ApiService.get(`task/${id}`);
  },
  create(params) {
    return ApiService.post("task", { text: params });
  },
  update(id, params) {
    return ApiService.update("task", id, { text: params });
  },
  destroy(id) {
    return ApiService.delete(`task/${id}`);
  }
};

export const UserService = {
  get(id) {
    return ApiService.get(`user/${id}`);
  },
  login(params) {
    return ApiService.post("user/login", params);
  },
  signup(params) {
    return ApiService.post("user/signup", params);
  }
};
