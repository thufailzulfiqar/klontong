import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import ProductDetail from "../components/ProductDetail.vue";
import LoginPage from "../components/LoginPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/product/:id", component: ProductDetail },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
