<template>
  <div class="product" v-if="data.detalle">
    <ko-modal v-show="modalPayment"></ko-modal>
    <div class="wrapper">
      <div class="section">
        <div class="photos">
          <div class="photos_selected">
            <image-cloudinary
              :src="setMiniPhoto(data.detalle.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(data.detalle.foto_cloudinary)"
              :width="100"
            />
            <image-cloudinary
              :src="setMiniPhoto(foto.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(foto.foto_cloudinary)"
              v-for="foto in data.fotos"
              :width="100"
            />
            <img
              v-if="idYoutube"
              :src="`https://img.youtube.com/vi/${idYoutube}/0.jpg`"
              v-show="idYoutube"
              v-on:mouseover="existYoutube = true"
            >
          </div>
          <div class="photo_main">
            <zoomed
              v-if="data.detalle.foto !== 'placeholder1.svg'"
              v-show="!existYoutube"
              :photo="selectPhotoUrl"
            ></zoomed>
            <img :src="selectPhotoUrl" v-else class="photo_main_placeholder">
            <iframe
              v-show="existYoutube"
              width="400"
              height="250"
              :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="photos responsive">
          <product-slide
            :photos="data.fotos"
            :photo="data.detalle.foto_cloudinary"
            :idYoutube="idYoutube"
          ></product-slide>
        </div>
        <div class="content">
          <h2 class="content_name">{{data.detalle.nombre}}</h2>
          <div class="content_buy_price">
            <h3 class="colorTexto" v-show="salesData.precio">${{ salesData.precio | currency }}</h3>
            <p class="colorTexto" v-show="salesData.precio">COP</p>
          </div>
          <p>
            <strong>{{ data.info.marca }}</strong>
          </p>
          <!-- <p>{{beforeCombination}}</p> -->
          <div class="content_variant">
            <div class="content_variant_item" v-for="(variant, index) in data.variantes">
              <label>{{ variant.nombre }}:</label>
              <ko-radio-group :options="variant.valores" :index="index"></ko-radio-group>
            </div>
          </div>
          <div :class="{content_buy: true, disabled: !salesData.estado}">
            <button type="button" name="button">No esta disponible</button>
            <div>
              <div class="quantity" v-show="!spent">
                <em>Cantidad:</em>
                <button class="quantity_remove" v-on:click="removeQuantity()">
                  <i class="material-icons">remove</i>
                </button>
                <p class="quantity_value">{{ quantityValue }}</p>
                <button class="quantity_add" v-on:click="addQuantity()">
                  <i class="material-icons">add</i>
                </button>
                <!-- <p class="quantity_available" v-if="evalStock(maxQuantityValue, quantityValue)">{{ maxQuantityValue - quantityValue }} disponibles</p> -->
              </div>
              <div class="content_buy_action">
                <button v-if="spent" class="spent">
                  Producto agotado
                  <i class="material-icons">add_shopping_cart</i>
                </button>
                <button v-else v-on:click="addShoppingCart">
                  Agregar
                  <i class="material-icons">add_shopping_cart</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="content_desc" v-if="data.info.descripcion && data.info.descripcion.length > 12">
          <h3>Descripción del producto</h3>
          <div v-html="data.info.descripcion"></div>
        </div>
        <div class="features">
          <div class="features_item">
            <img
              src="http://res.cloudinary.com/komercia-store/image/upload/v1536696054/komercia/cards.png"
              alt
            >
            <div class="features_item_info">
              <h3>Pagos online</h3>
              <p>Contamos con diferentes medios de pago para que realices tus compras por internet</p>
              <button v-show="existPayments" v-on:click="togglePayment">VER MEDIOS DE PAGOS</button>
            </div>
          </div>
          <div class="features_item" v-show="envios.estado">
            <img
              src="http://res.cloudinary.com/komercia-store/image/upload/v1536696043/komercia/mensajero.png"
              alt
            >
            <div class="features_item_info">
              <h3>{{ envio.titulo }}</h3>
              <p>{{ envio.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import zoomed from "../ui_components/zoomed.vue";
import productSlide from "../ui_components/product_slide.vue";
import koModal from "../ui_components/modal.vue";
import koRadioGroup from "../ui_components/radio_group";
import ProductDetails from "../../logic/product_details.js";

export default {
  mixins: [ProductDetails],
  name: "koProduct1",
  components: { zoomed, productSlide, koModal, koRadioGroup }
};
</script>

<style scoped>
.wrapper {
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 30px;
}
.section {
  display: flex;
  justify-content: space-between;
}
.photos {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.photos.responsive {
  display: none;
}
.photos_selected {
  width: 80px;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.photos_selected img {
  width: 100%;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}
.quantity_available {
  font-size: 14px;
  color: #494949;
}
.photo_main {
  max-width: 450px;
  max-height: 400px;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.photo_main_placeholder {
  width: 450px;
}
.content {
  width: 350px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
}
i.close {
  color: black;
  align-self: flex-end;
  cursor: pointer;
}
.content_name {
  font-weight: normal;
  color: var(--text_color);
  margin: 7px 0;
}
.content_buy {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
}
.content_buy > button {
  display: none;
}
.content_buy > div {
  width: 100%;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
}
.content_buy.disabled > button {
  position: absolute;
  display: flex;
  background-color: #fff;
  padding: 13px 40px;
  border-style: none;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
  z-index: 2;
}
.content_buy.disabled > div {
  pointer-events: none;
  filter: blur(5px);
  opacity: 0.2;
}
.content_buy_price {
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
}
.content_buy_price h3 {
  font-weight: normal;
  font-size: 40px;
  color: var(--text_color);
}
.content_buy_price p {
  margin-bottom: 8px;
  color: var(--text_color);
}
.content_buy_action {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.content_buy_action button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  align-items: center;
  color: #fff;
  border-style: none;
  background-color: var(--main_color);
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
}
.content_buy_action button.spent {
  background-color: #b0b0b0;
  pointer-events: none;
}
.content_buy_action button:hover {
  transform: scale(0.9);
}
.content_buy_action button i {
  font-size: 19px;
  margin-left: 10px;
  padding: 4px 0px;
  padding-left: 10px;
}
.content_desc {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 30px 0;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  text-align: justify;
  word-break: break-word;
}
.content_desc * {
  color: #333;
}
.content_variant {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}
.content_variant_item {
  display: flex;
  align-items: center;
}
.content_variant_item label {
  margin-right: 10px;
  color: #333;
}
.quantity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: center;*/
  align-items: center;
  margin: 5px;
}
.quantity em {
  text-align: center;
  margin-right: 10px;
  font-size: 13px;
  font-style: normal;
}
.quantity_remove,
.quantity_add {
  border-style: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}
.quantity_value {
  margin: 0 10px;
  font-weight: normal;
  color: #333;
}
.quantity_remove:hover,
.quantity_add:hover,
#actionAddCart:hover {
  transform: scale(1.1);
}
.quantity_remove i,
.quantity_add i {
  color: #333;
  font-size: 14px;
  font-weight: bold;
  pointer-events: none;
}
.features {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 0px;
}
.features_item {
  width: 500px;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  margin: 10px 0;
  padding: 0 25px;
}
.features_item:nth-child(2) img {
  align-self: flex-end;
}
.features_item_info {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.features_item_info h3 {
  font-size: 16px;
  color: var(--text_color);
}
.features_item_info p {
  font-size: 14px;
  margin: 8px 0;
  color: var(--text_color);
}
.features_item_info button {
  border-style: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: bold;
  color: var(--main_color);
  cursor: pointer;
  outline: none;
}
.features_item .epayco {
  width: 85%;
  margin: 8px 0;
}
.features_item .efecty {
  max-width: 200px;
  max-height: 200px;
}
.features_item .convenir {
  max-width: 100px;
  max-height: 100px;
}
.features_item .tienda {
  max-width: 100px;
  max-height: 100px;
}
@media (max-width: 1150px) {
  .section:nth-child(2) {
    flex-direction: column;
  }
  .features {
    max-width: 100%;
  }
  .features_item {
    max-width: 500px;
    width: 100%;
  }
}
@media (max-width: 1000px) {
  .section:nth-child(1) {
    flex-direction: column;
  }
  .content {
    width: 100%;
    height: initial;
  }
}
@media (max-width: 710px) {
  .product {
    position: relative;
    width: 100%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
@media (max-width: 600px) {
  .photos {
    max-width: 100%;
    width: 100%;
    display: none;
  }
  .photos.responsive {
    display: flex;
  }
}
@media (max-width: 320px) {
  .features_item {
    flex-direction: column;
  }
  .features_item_info {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
