import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import ProductDetail from "../components/ProductDetail.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/product/:id", component: ProductDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
