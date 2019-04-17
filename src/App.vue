<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("GET_COMPONENTS");
    this.$store.dispatch("GET_SECTIONS");
    this.$store.commit("GET_DATA");
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.materialstyle .g-card {
  background: #fff !important;
  border-radius: 2px !important;
  display: inline-block;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-style: none !important;
}
.materialstyle .g-item {
  border-top-style: none !important;
  border-bottom-style: none !important;
}
.materialstyle .g-btn {
  display: inline-block;
  position: relative;
  cursor: pointer;
  line-height: 35px;
  padding: 0 1.5rem;
  background-color: var(--button_color) !important;
  color: var(--button_text_color) !important;
  font-size: 15px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.8px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  outline: none;
  border: none;
  user-select: none;
  border-radius: 2px;
  transition: all 0.3s ease-out;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.225);
}
.materialstyle .g-btn:hover {
  text-decoration: none;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.225);
}
</style>
