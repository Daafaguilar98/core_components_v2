<template>
  <router-link :to="`/productos/${data.slug}`" class="container-product materialstyle">
    <div class="img-grid-item">
      <image-cloudinary :src="data.foto_cloudinary" :width="300"/>
    </div>
    <div class="grid-item-description">
      <div class="price">{{data.precio | currency}}</div>
      <p class="name-product">
        {{data.nombre}}
        <span v-show="data.marca">- {{data.marca}}</span>
      </p>
    </div>
    <button class="btn-product g-btn" type="button" name="button">
      <a>Ir al Producto</a>
    </button>
  </router-link>
</template>

<script>
export default {
  name: "koProductCard1",
  props: ["data"],
  data() {
    return {};
  },
  computed: {
    foto() {
      if (this.data.placeholder) {
        return require(`../../assets/${this.data.foto}`);
      } else {
        return `${this.$urlHttp}/productos/${this.data.foto}`;
      }
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
      return "";
    }
  }
};
</script>

<style scoped>
.container-product {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
  justify-items: center;
  align-items: space-between;
}
.img-grid-item {
  max-width: 250px;
  width: 100%;
  max-height: 250px;
  height: 250px;
  display: grid;
  justify-items: center;
  justify-self: center;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
}
.img-grid-item img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}
.grid-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.btn-product {
  display: flex;
  margin-top: 15px;
  cursor: pointer;
}
.name-product {
  text-align: center;
  color: var(--text_color);
  font-size: 14px;
}
.category {
  color: var(--text_color);
  padding: 3px 0;
  font-size: 14px;
}
.price {
  font-weight: bold;
  color: var(--text_color);
}
@media (max-width: 425px) {
  .img-grid-item {
    max-width: 150px;
    max-height: 150px;
  }
}
</style>
