<template>
  <router-link :to="`/productos/${data.slug}`" class="card product-card materialstyle">
    <div class="img-product">
      <image-cloudinary :src="data.foto_cloudinary" :width="300"/>
    </div>
    <div class="description-product">
      <p class="name-product">{{data.nombre.slice(0,25).toLowerCase()}}</p>
      <p class="price">
        {{data.precio | currency}}
        <!-- <s>{{ product.precio * 1.2 | currency }}</s> -->
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "koProductCard2",
  props: ["data"],
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid var(--button_color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.description-product {
  background-color: var(--button_color);
  text-align: left;
}
.img-product {
  flex: 1;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  border: 0px solid transparent;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* background-color: #333; */
}
.img-product > img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}
.name-product {
  margin: 20px 0 10px 20px;
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 1.5;
  display: inline-block;
  color: var(--button_text_color);
}
.name-product:hover {
  color: var(--button_text_color);
  cursor: pointer;
  opacity: 0.7;
}
.price {
  margin-left: 20px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 1.5;
  color: var(--button_text_color);
  padding-bottom: 10px;
}
s {
  color: rgb(116, 116, 116);
  padding-left: 20px;
}
@media (max-width: 620px) {
  .name-product {
    font-size: 13px;
    margin-top: 10px;
  }
  .price {
    font-size: 11px;
    margin-bottom: 0;
  }
  .img-product {
    max-height: 250px;
  }
  .img-product > img {
    max-height: 250px;
  }
}
@media (max-width: 450px) {
  .name-product {
    font-size: 11px;
    /* margin-top: 10px; */
  }
  .price {
    font-size: 9px;
    /* margin-bottom: 0; */
  }
  .img-product {
    max-height: 200px;
  }
  .img-product > img {
    max-height: 200px;
  }
}
@media (max-width: 350px) {
  s {
    padding-left: 10px;
  }
}
</style>
