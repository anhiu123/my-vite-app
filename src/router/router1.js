// router.js

import { createRouter, createWebHistory } from "vue-router";

import ListPr from "../components/ListPr.vue";
import Login from "../components/Login.vue";
import AddPr from "../components/AddPr.vue";
import EditPr from "../components/EditPr.vue";
import Products from "../components/Products.vue";
import ProductDetail from "../components/ProductDetail.vue";
import SignUp from '../components/SignUp.vue';
import Home from '../components/Home.vue';

const routes = [

  { name :"Home", path: "/home", component: Products },
  { path: "/products", component: ListPr },
  { path: "/add", component: AddPr },
  { path: "/:id/edit", component: EditPr },

  { path: "/product/:id", component: ProductDetail, name: "ProductDetail" },
   { name:"Login",path: '/', component: Login },
  { name:"SignUp", path: '/signup', component: SignUp },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
