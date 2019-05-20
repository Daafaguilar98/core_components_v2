<template>
  <div class="build_component">
    <div :class="{build_component__header: true, active}">
      <div class="header__content">
        <el-button type="primary" icon="el-icon-setting"></el-button>
        <el-select></el-select>
      </div>
      <div class="header__toogle" @click="handleHeader">
        <span class="header__toogle_button"></span>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    handleHeader() {
      this.active = !this.active;
    }
  }
};
</script>

<style>
.build_component {
  min-height: 100vh;
}
.build_component__header {
  position: relative;
  top: -90px;
  width: 100%;
  display: grid;
  grid-template-rows: 90px 30px;
  transition: 0.3s;
}
.build_component__header div {
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
}
.header__content {
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  padding: 0 20px;
}
.header__toogle {
  cursor: pointer;
}
.header__toogle_button {
  position: relative;
  display: inline-block;
}
.header__toogle_button::before,
.header__toogle_button::after {
  position: absolute;
  content: "";
  width: 19px;
  height: 2px;
  background-color: #000;
  transition: 0.3s;
}
.header__toogle_button::after {
  left: -2px;
}
.header__toogle_button::before {
  left: -18px;
  transform: rotate(0deg) scaleX(-1);
}
.header__toogle:hover .header__toogle_button::before {
  transform: rotate(25deg) scaleX(-1);
}
.header__toogle:hover .header__toogle_button::after {
  transform: rotate(-25deg);
}

/* header is active */
.build_component__header.active {
  top: 0px;
}
.build_component__header.active .header__toogle_button::before {
  transform: rotate(-25deg);
}
.build_component__header.active .header__toogle_button::after {
  transform: rotate(25deg);
}
</style>

