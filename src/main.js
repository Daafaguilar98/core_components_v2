import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Popover, Badge } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ImageCloudinary from 'image-cloudinary';
import ProductCard1 from './design/product_cards/product_card1';
import ProductCard2 from './design/product_cards/product_card2';
import VuePaginate from 'vue-paginate'
Vue.config.productionTip = false;

Vue.use(Popover);
Vue.use(Badge);
Vue.use(ImageCloudinary)
Vue.component(ProductCard1.name, ProductCard1)
Vue.use(VuePaginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
