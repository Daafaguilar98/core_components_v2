import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ReferenceNew from "./views/references/new"
import BuildComponent from "./views/build_component"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/reference/new",
      name: "reference_new",
      component: ReferenceNew
    },
    {
      path: "/reference/:id",
      name: "home",
      component: Home
    },
    {
      path: "/build-component",
      name: "build_component",
      component: BuildComponent
    }
  ]
});
