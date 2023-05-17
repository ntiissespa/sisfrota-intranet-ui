import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "app",
    component: App,
    children: [
      {
        path: "/",
        name: "checklist",
        component: () => import("./pages/checklist/ChecklistView.vue"),
      },
      {
        path: "/veiculos",
        name: "veiculos",
        component: () => import("./pages/vehicle/VehicleView.vue"),
      },
      {
        path: "/documentos",
        name: "documentos",
        component: () => import("./pages/document/DocumentView.vue"),
      },
      {
        path: "/acessorios",
        name: "acessorios",
        component: () => import("./pages/accessory/AccessoryView.vue"),
      },
      {
        path: "/avarias",
        name: "avarias",
        component: () => import("./pages/breakdown/BreakdownView.vue"),
      },
      {
        path: "/pneus",
        name: "pneus",
        component: () => import("./pages/tire/TireView.vue"),
      },
      {
        path: "/motoristas",
        name: "motoristas",
        component: () => import("./pages/driver/DriverView.vue"),
      },
    ],
  },
  {
    path: "/acesso-negado",
    name: "acesso-negado",
    component: () => import("./pages/access/AccessDenied.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
