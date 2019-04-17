<template>
  <div class="product_list">
    <div class="filter_column g-card">
      <koSearcher @searcher="Searchproduct"/>
      <div class="lateral">
        <koCategories
          @selectionSubcategory="selectedSubCategory"
          @selectionCategory="selectedCategory"
          @clear="Allcategories"
        />
      </div>
      <div class="price_range" v-if="range.max">
        <h4>Filtro por precio</h4>
        <p>Elija un rango de precios para buscar</p>
        <el-slider v-model="price" range :step="50" :max="range.max"></el-slider>
        <div class="price_range_label">
          <p>
            Precio:
            <strong>{{ price[0] | currency }}</strong> -
            <strong>{{ price[1] | currency }}</strong>
          </p>
        </div>
      </div>
      <el-select v-model="HigherOrLower">
        <el-option label="Mayor precio" value="higher"></el-option>
        <el-option label="Menor precio" value="lower"></el-option>
      </el-select>
    </div>
    <div class="products">
      <div class="product_list_wrapper" v-if="products.length">
        <div class="products_list">
          <div
            :is="selectedCard"
            v-for="product in filterProduct"
            :key="product.id"
            :data="product"
          ></div>
        </div>
        <div class="product_pagination" v-if="products.length > 40">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="40"
            :total="products.length"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductLists from "../../logic/product_lists.js";
import koCategories from "../ui_components/categories";
import koSearcher from "../ui_components/searcher";
export default {
  mixins: [ProductLists],
  name: "koProductList2",
  components: { koCategories, koSearcher }
};
</script>
<style scoped>
.product_list {
  padding: 10px;
  margin: 0 auto;
  max-width: 1366px;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-column-gap: 20px;
  align-items: start;
}
.buttonclose {
  z-index: 0;
}
.responsive {
  display: none;
}
.filter_column {
  background-color: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: sticky;
  top: 120px;
}
.filter_column .el-select {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}
.filter_column .lateral {
  display: grid;
}
.price_range {
  padding: 10px 20px 5px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: grid;
}
.price_range h4 {
  font-size: 14px;
  margin-bottom: 5px;
}
.price_range p {
  font-size: 12px;
  color: #7e7e7e;
}
.price_range_label {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
}
.products .products_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
}
.product_pagination {
  display: grid;
  justify-content: center;
  margin: 30px 0;
}
@media screen and (max-width: 840px) {
  .product_list {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  .filter_column {
    position: static;
  }
}
@media screen and (max-width: 525px) {
  .product_list {
    grid-template-columns: 1fr;
    padding: 0px;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 5px;
  }
}
@media screen and (max-width: 375px) {
  .product_list {
    padding: 0;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 5px;
  }
}
</style>
