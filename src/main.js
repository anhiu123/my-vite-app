
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router1";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);
app.use(router);

app.mount("#app");
router.beforeEach((to, from, next) => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta.role;
  
    if (requiresAuth && !userInfo) {
      // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
      next({ name: 'Login' });
    } else if (requiresAuth && requiredRole && userInfo && userInfo.role !== requiredRole) {
      // Đã đăng nhập nhưng không có quyền truy cập, chuyển hướng đến trang không quyền
      next({ name: 'NoPermission' });
    } else {
      // Điều hướng bình thường
      next();
    }
  });
