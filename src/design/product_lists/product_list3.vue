<template>
  <div class="product-list">
    <div class="header">{{ selectedType == 'category' ? selectedCategory2 : 'productos' }}</div>
    <div class="container-grid">
      <div class="products">
        <div class="left" :class="{ 'left-categories': true, hidden: add}">
          <div class="categories">
            <h3 class="title-categories">Categorias</h3>
            <ul class="list-categories">
              <li class="item-categorie" @click="clear">
                <span>Todos los Productos</span>
              </li>
              <li
                class="item-categorie"
                @mouseover="mouseOver(index)"
                @mouseleave="mouseLeave"
                @click="selected(categoria)"
                v-for="(categoria, index) in categorias"
                :key="categoria.id"
              >
                <p
                  @click="sendCategory(categoria.nombre_categoria_producto)"
                >{{categoria.nombre_categoria_producto}}</p>
                <div :class="{ popover: sub == index}" v-if="sub == index">
                  <ul>
                    <li
                      class="item-subcategorie"
                      v-for="subcategory in subcategories"
                      v-if="categoria.id===subcategory.categoria"
                      @click="Sendsubcategory(subcategory.id)"
                      :key="subcategory.id"
                    >
                      <span>{{subcategory.nombre_subcategoria}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <!-- input -->
          <div class="ko-input">
            <input v-model="search" type="email" placeholder="Buscar">
            <i class="icon-search"></i>
          </div>
          <!-- end input -->
          <div class="container">
            <div class="grid-products">
              <div
                :is="selectedCard"
                v-for="product in filterProduct"
                :key="product.id"
                :data="product"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-medium">
      <div class="product_pagination" v-if="products.length > 40">
        <el-pagination
          layout="prev, pager, next"
          :total="products.length"
          :page-size="40"
          :current-page.sync="currentPage"
          class="pagination"
        ></el-pagination>
      </div>
    </div>
    <div class="pagination-small">
      <div class="product_pagination" v-if="products.length > 40">
        <el-pagination
          layout="prev, pager, next"
          :total="products.length"
          :page-size="40"
          :current-page.sync="currentPage"
          class="pagination"
          :small="true"
        ></el-pagination>
      </div>
    </div>
    <div class="btn-categories" @click="addClass()">
      <i class="icon-filter"></i>
    </div>
  </div>
</template>

<script>
import ProductLists from "../../logic/product_lists.js";
export default {
  mixins: [ProductLists],
  name: "koProductList3"
};
</script>

<style scoped>
@import "https://unpkg.com/komercia-fuentes@1.0.1/styles.css";
.header {
  background-color: var(--main_color);
  color: var(--button_text_color);
  width: 100%;
  height: 160px;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}
.container-grid {
  margin-top: 60px;
  margin-bottom: 80px;
}
.left {
  /* background-color: aqua; */
  flex: 0.2;
  padding: 0 20px;
  box-sizing: border-box;
}
.right {
  flex: 1;
}
.products {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  align-items: flex-start;
}
.title-categories {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 30px 0;
  border-bottom: 1px solid rgba(218, 218, 218, 0.644);
}
.list-categories {
  margin-top: 20px;
}
.item-categorie {
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 10px 0 10px 5px;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.item-subcategorie {
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 5px 15px;
  font-size: 12px;
  line-height: 1.5;
  color: #555;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
}
.item-subcategorie:hover {
  color: #000;
  background-color: rgba(85, 85, 85, 0.062);
}
.item-categorie:hover {
  color: #000;
  background-color: rgba(85, 85, 85, 0.062);
}
.grid-products {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ko-input {
  position: relative;
  display: grid;
  align-content: start;
  justify-content: flex-end;
  grid-row-gap: 5px;
  margin: 20px;
  /*width: 250px;*/
}
.ko-input input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid rgba(26, 26, 26, 0.459);
  font-size: 14px;
  border-radius: 2px;
  outline-color: var(--main_color);
  color: rgb(0, 0, 0);
}
.ko-input i.icon-search {
  position: absolute;
  top: 12.5px;
  right: 15px;
  z-index: 2;
}
.ko-input .response {
  justify-self: start;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  height: 28px;
  line-height: 26px;
}
.pagination {
  font-weight: 300;
}
.el-pager li.active {
  border: 1px solid #000;
}
.btn-categories {
  display: none;
}
.pagination-small {
  display: none;
}
.popover {
  width: 300px;
  background-color: #fff;
  /* border: 1px solid #eee; */
  position: absolute;
  right: -240px;
  top: 0;
  z-index: 99;
  box-sizing: border-box;
  /* padding: 15px 0; */
}
@media (max-width: 1290px) {
  .grid-products {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    grid-gap: 20px;
    padding: 0 20px;
  }
  .container-grid {
    margin-top: 80px;
  }
}
@media (max-width: 1020px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    grid-gap: 20px;
    padding: 0 40px;
  }
  .ko-input {
    margin-right: 40px;
  }
}
@media (max-width: 970px) {
  .left {
    display: none;
  }
  .btn-categories {
    display: flex;
    width: 45px;
    height: 45px;
    background: #333;
    position: fixed;
    top: 50vh;
    right: 0;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
    z-index: 150;
  }
  .icon-filter {
    color: #fff;
  }
  .left-categories {
    position: fixed;
    display: flex;
    height: 100vh;
    display: flex;
    background-color: #fff;
    top: 0;
    left: 0;
    width: 300px;
    transition: all 0.3s ease;
    border-right: 1px solid #eee;
    z-index: 99;
  }
  .left-categories.hidden {
    transform: translateX(-100%);
  }
}
@media (max-width: 620px) {
  .grid-products {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    grid-gap: 10px;
    padding: 0 5px;
  }
  .ko-input {
    margin-right: 5px;
  }
  .pagination-small {
    display: flex;
  }
  .pagination-medium {
    display: none;
  }
  .ko-input input {
    padding: 8px 15px 8px 15px;
  }
  .ko-input i.icon-search {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 2;
  }
  .container-grid {
    margin-top: 30px;
  }
  .header {
    height: 120px;
  }
}
</style>
