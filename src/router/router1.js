// router.js

import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/Login.vue";
import AddPr from "../components/AddPr.vue";
import EditPr from "../components/EditPr.vue";
import ProductDetail from "../components/ProductDetail.vue";
import SignUp from '../components/SignUp.vue';
import NoPermission from '../components/NoPermission.vue';
import UserDashboard from '../view/UserDashboard.vue';
const routes = [

  { name :"UserDashboard", path: "/", component: UserDashboard },
  { path: "/add", component: AddPr },
  { path: "/:id/edit", component: EditPr },

  { path: "/product/:id", component: ProductDetail, name: "ProductDetail" },
  { name:"Login",path: '/login', component: Login },
  { name:"SignUp", path: '/signup', component: SignUp },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../view/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' } // Đặt quyền cần thiết
  },
  {
    path: '/',
    name: 'UserDashboard',
    component: () => import('../view/UserDashboard.vue'),             
    meta: { requiresAuth: true, role: '' } // Đặt quyền cần thiết
  },
  { path: '/no-permission', name: 'NoPermission', component: NoPermission },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
