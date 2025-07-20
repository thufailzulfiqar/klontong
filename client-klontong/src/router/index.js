import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import ProductDetail from "../components/ProductDetail.vue";
import LoginPage from "../components/LoginPage.vue";
import AddProduct from "../components/AddProduct.vue"; // import komponen
import ManageUser from "../components/ManageUser.vue"; // import komponen
import RegisterPage from "../components/RegisterPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/product/:id", component: ProductDetail },
  { path: "/login", component: LoginPage },
  { path: "/add-product", component: AddProduct }, // tambahkan route baru
  { path: "/manage-user", component: ManageUser }, // tambahkan route baru
  { path: "/register", component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
