<template>
  <div class="slider">
    <iframe :src="setting.url_iframe" frameborder="0" :style="{height: `${setting.size_iframe}vh`}"></iframe>
  </div>
</template>

<script>
import Banners from "../../logic/banners.js";

export default {
  mixins: [Banners],
  name: "ko-slider-5"
};
</script>

<style>
.slider {
  width: 100%;
}
.slider iframe {
  width: 100%;
  height: 100%;
}
</style>