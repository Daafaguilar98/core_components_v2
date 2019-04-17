<template>
  <div class="container">
    <div class="item item_image">
      <img :src="setting.items[0].photo">
    </div>
    <div class="item item_content">
      <div class="item texto">
        <h2>{{ setting.items[0].title }}</h2>
        <p>{{ setting.items[0].description }}</p>
        <a :href="setting.items[0].redirect_url">
          <button class="button">{{setting.items[0].button_text}}</button>
        </a>
      </div>
    </div>
    <div class="item item_content item_last">
      <div class="item texto">
        <h2>{{ setting.items[1].title }}</h2>
        <p>{{ setting.items[1].description }}</p>
        <a :href="setting.items[1].redirect_url">
          <button class="button">{{setting.items[1].button_text}}</button>
        </a>
      </div>
    </div>
    <div class="item item_image">
      <img :src="setting.items[1].photo">
    </div>
  </div>
</template>

<script>
import Contents from "../../logic/contents.js";
export default {
  mixins: [Contents],
  name: "koContent1"
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  max-width: 1366px;
  margin: 0 auto;
}
.item {
  font-size: 12px;
}
.item .texto {
  max-width: 400px;
  width: 100%;
  text-align: justify;
  line-height: 22px;
  font-size: 16px;
  padding: 20px;
  box-sizing: border-box;
  color: var(--text_color);
}
.item .button {
  font-weight: bold;
  background-color: var(--button_color);
  border: none;
  color: var(--button_text_color);
  height: 30px;
  width: 150px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  margin-top: 10px;
}
.item .button:hover {
  transform: scale(1.1);
}
.item_image {
  overflow: hidden;
}
.item_image img {
  max-height: 500px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  z-index: 1;
}
h2 {
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 20px;
}
.item_content {
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
}
@media screen and (max-width: 800px) {
  .container {
    grid-template: repeat(4, 1fr) / 1fr;
    max-height: 50%;
  }
  .item_last {
    order: 3;
  }
  .item .texto {
    width: initial;
  }
}
@media screen and (max-width: 600px) {
  .item .texto {
    font-size: 14px;
  }
}
</style>
