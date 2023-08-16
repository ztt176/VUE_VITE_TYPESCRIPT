import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
  } from "vue-router";

// import Home from "@/views/home.vue";

const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/home",
//     name: "home",
//     component: Home,
//   }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;