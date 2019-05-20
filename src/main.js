import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';
import '../public/index.css'
import ImageCloudinary from 'image-cloudinary';
import ProductCard1 from './design/product_cards/product_card1';
import ProductCard2 from './design/product_cards/product_card2';
import VuePaginate from 'vue-paginate'
import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(ImageCloudinary)
Vue.component(ProductCard1.name, ProductCard1)
Vue.use(VuePaginate)
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
