<template>
  <div class="grid">
    <div v-for="product in products" :key="product.id" class="grid-item">
      <div :is="selectedCard" :data="product"></div>
    </div>
  </div>
</template>
<script>
import Grids from "../../logic/grids.js";
export default {
  mixins: [Grids],
  name: "koGrid1"
};
</script>

<style scoped>
.grid {
  margin: 0 auto;
  padding: 20px 0;
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 100px;
}
.grid-item {
  width: 100%;
  height: 100%;
}
@media (max-width: 1119px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 80px;
  }
}
@media (max-width: 957px) {
  .grid {
    grid-gap: 20px;
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
@media (max-width: 440px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
