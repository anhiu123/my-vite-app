
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ListPr from "./components/ListPr.vue";
import Login from "./components/Login.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import router from "./router/router1";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);
app.use(router);

app.mount("#app");

