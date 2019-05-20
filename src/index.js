// import Chat from './components/chat/chat';
// import Whatsapp from './components/chat/whatsapp.vue';
// import Preloader from './design/preloaders/preloader1';
import Cart1 from './design/carts/cart1';

import Contact1 from './design/contacts/contact1';
import Contact2 from './design/contacts/contact2';

import Content1 from './design/contents/content1';
import Content2 from './design/contents/content2';

// import Newsletter from './design/newsletters/newsletter1';

import Footer1 from './design/footers/footer1';
import Footer2 from './design/footers/footer2';
import Footer3 from './design/footers/footer3';

import Grid1 from './design/grids/grid1';
import Grid2 from './design/grids/grid2';

import Header1 from './design/headers/header1';
import Header2 from './design/headers/header2';
import Header3 from './design/headers/header3';
import Header4 from './design/headers/header4';
import Header5 from './design/headers/header5';
import Header6 from './design/headers/header6';

import ProductDetail1 from './design/product_details/product_detail1';
import ProductDetail2 from './design/product_details/product_detail2';

import Separator1 from './design/separators/separator1';

// import Banner1 from './design/banners/banner1';
import Banner2 from './design/banners/banner2';
import Banner3 from './design/banners/banner3';
import Banner4 from './design/banners/banner4';
import Banner5 from './design/banners/banner5';

import ProductList1 from './design/product_lists/product_list1';
import ProductList2 from './design/product_lists/product_list2';
import ProductList3 from './design/product_lists/product_list3';
// import ProductCard1 from './design/_productCard/product_card1';
// import ProductCard2 from './design/_productCard/product_card2';
import Video1 from './design/videos/video1';
// import Order1 from './design/_order/order1';

const components = [
  Chat,
  Whatsapp,
  Preloader,
  Header1,
  Header2,
  Header3,
  Header4,
  Header4v1,
  Header6,
  Header5,
  Cart1,
  ProductDetail1,
  ProductDetail2,
  Contact1,
  Contact2,
  Content1,
  Content2,
  // Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Separator1,
  Grid1,
  Grid2,
  ProductList1,
  ProductList2,
  ProductList3,
  ProductCard1,
  ProductCard2,
  Newsletter,
  Footer1,
  Footer2,
  Footer3,
  Order1,
  Video1
];

const modules = {};
modules.install = Vue => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i]);
  }
};
export default modules;
