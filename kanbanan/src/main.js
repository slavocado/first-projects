import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import moment from "moment";

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(require("vue-moment"));

new Vue({
  render: (h) => h(App),
}).$mount("#app");

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY HH:mm:ss");
  }
});
