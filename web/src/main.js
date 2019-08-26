import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ApiService from "./common/api.service";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

ApiService.init();

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");