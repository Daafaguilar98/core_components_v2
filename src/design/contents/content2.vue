<template>
  <div class="content2">
    <template v-for="brand in setting.items">
      <router-link
        v-if="brand.redirect_to.type == 1"
        :class="setting.effect"
        :to="`/productos/${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 2"
        :class="setting.effect"
        :to="`/productos?category=${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 3"
        :class="setting.effect"
        :to="`/productos?search=${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 4"
        :class="setting.effect"
        :to="brand.redirect_to.value"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <a
        v-else-if="brand.redirect_to.type == 5"
        :class="setting.effect"
        :href="brand.redirect_to.value"
        target="_blank"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </a>
      <a v-else href="#" :class="setting.effect">
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.width"
          :style="`margin: 0 ${setting.spaces}px`"
          :class="setting.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </a>
    </template>
  </div>
</template>

<script>
import Contents from "../../logic/contents.js";
export default {
  mixins: [Contents],
  name: "koContent2"
};
</script>

<style scoped>
.content2 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1366px;
  width: 100%;
  justify-content: center;
  margin: 0 auto 60px;
}
.content2 a {
  cursor: pointer;
}
.content2 img {
  overflow: hidden;
}
.content2 .text {
  display: none;
}
/* ESCALA DE GRISES */
img.effect_grayscale {
  filter: grayscale(1);
  opacity: 0.5;
  transition: 0.2s;
}
img.effect_grayscale:hover {
  filter: grayscale(0);
  opacity: 1;
}
/* BLUR */
img.effect_blur {
  position: relative;
  transition: 0.3s;
}
a.effect_blur {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
}
a.effect_blur .text {
  content: attr(data-title);
  position: absolute;
  top: -50%;
  display: block;
  transition: 0.3s;
}
a.effect_blur:hover .text {
  top: calc(50% - 17px);
}
a.effect_blur:hover img.effect_blur {
  filter: blur(15px);
}
/* TAMAÑO */
img.effect_size {
  transition: 0.3s;
}
img.effect_size:hover {
  transform: scale(0.8);
}
/* ONLY TEXT */
a.effect_text {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
a.effect_text .text {
  content: attr(data-title);
  position: absolute;
  top: 110%;
  display: block;
  opacity: 0;
  transition: 0.3s;
}
a.effect_text:hover .text {
  top: 100%;
  opacity: 1;
}
</style>
