<template>
  <div class="cart">
    <div class="cart_products">
      <ul class="products_list">
        <li v-for="(product, index) in products" class="products_item">
          <img :src="setFoto(product)" class="products_item_photo" :alt="product.nombre">
          <div class="products_item_info">
            <h3 class="item_info_name">{{ product.nombre }}</h3>
            <p class="item_info_price">{{ product.precio | currency }}</p>
            <span class="item_info_quantity">
              <p>Cantidad:</p>
              <input type="number" v-model="product.cantidad" @input="show">
            </span>
            <span>
              <p class="item_info_variant">Variante:</p>
              <ul class="item_info_combinations">
                <p v-for="item in product.combinacion">{{ item }}</p>
              </ul>
            </span>
          </div>
          <div class="products_item_right">
            <a v-on:click="deleteItemCart(index)" class="delete">Eliminar</a>
            <p>{{ product.precio * product.cantidad | currency }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart_summary">
      <header>
        <h2>RESUMEN</h2>
      </header>
      <div class="cart_summary_body">
        <span>
          <p>Subtotal:</p>
          <p>{{ totalCart | currency }}</p>
        </span>
        <span>
          <p>Envio:</p>
          <p>{{ shipping | currency }}</p>
        </span>
        <hr>
        <span>
          <p>Total:</p>
          <p>{{ (totalCart + shipping) | currency }}</p>
        </span>
        <button class="cart-action" @click="next">CONTINUAR AL PAGO</button>
      </div>
    </div>
  </div>
</template>

<script>
import Carts from "../../logic/carts.js";
export default {
  mixins: [Carts],
  name: "koCart1"
};
</script>

<style scoped>
.cart {
  position: relative;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 400px auto;
  grid-column-gap: 15px;
  justify-content: center;
  align-items: start;
  padding: 100px 0;
}
.cart_summary {
  position: sticky;
  top: 100px;
  background-color: #fff;
}
.cart_products {
  width: 100%;
  /*height: 300px;
    overflow: auto;*/
}
.cart_products::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
.cart_products::-webkit-scrollbar {
  width: 0px;
  background-color: #f5f5f5;
}
.cart_products::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
.products_list {
  display: grid;
  grid-row-gap: 15px;
}
.products_item {
  width: 100%;
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.0975);
}
.products_item_photo {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  margin-right: 10px;
}
.products_item_info {
  flex: 1;
  display: grid;
  grid-row-gap: 5px;
}
.products_item_info span {
  display: flex;
}
.item_info_name {
  font-weight: 600;
  color: var(--text_color);
}
.item_info_price {
  color: var(--text_color);
}
.item_info_quantity {
  display: flex;
  align-items: center;
  color: var(--text_color);
}
.item_info_quantity input {
  width: 40px;
  margin-left: 10px;
  text-align: center;
}
.item_info_quantity input[type="number"] {
  -moz-appearance: textfield;
}
.item_info_quantity input::-webkit-outer-spin-button,
.item_info_quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.item_info_variant {
  color: var(--text_color);
}
.item_info_combinations {
  display: flex;
}
.item_info_combinations p {
  padding: 5px;
  margin: 0 5px;
  background-color: var(--main_color);
  color: #fff;
}
.products_item_right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text_color);
}
.products_item_right .delete {
  text-decoration: underline;
  font-size: 13px;
  text-align: right;
  font-weight: 600;
  cursor: pointer;
  color: var(--text_color);
}
.cart_summary {
  border: 1px solid rgba(0, 0, 0, 0.0975);
}
.cart_summary header {
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding: 10px;
}
.cart_summary header h2 {
  font-weight: 600;
  color: var(--text_color);
}
.cart_summary_body {
  display: grid;
  justify-content: center;
  padding: 10px 40px;
  color: var(--text_color);
}
.cart_summary_body hr {
  width: 100%;
}
.cart_summary_body > span {
  width: 200px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 8px 0;
}
.cart_summary_body > span p:nth-child(2) {
  font-weight: 600;
  color: var(--text_color);
}
.cart-action {
  margin: 15px 0;
  border-style: none;
  padding: 10px 0;
  background-color: var(--button_color);
  color: var(--button_text_color);
  cursor: pointer;
}
@media (max-width: 780px) {
  .cart {
    grid-auto-flow: column;
    grid-template-columns: auto;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 15px;
  }
}
</style>
