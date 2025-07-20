import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import ProductDetail from "../components/ProductDetail.vue";
import LoginPage from "../components/LoginPage.vue";
import AddProduct from "../components/AddProduct.vue"; // import komponen

const routes = [
  { path: "/", component: LandingPage },
  { path: "/product/:id", component: ProductDetail },
  { path: "/login", component: LoginPage },
  { path: "/add-product", component: AddProduct }, // tambahkan route baru
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
