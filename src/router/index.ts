import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { routesList } from '@/router/routes';

import Operations from '../views/Operations.vue';
import OperationForm from '../views/OperationForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: routesList.operations.path,
    name: routesList.operations.name,
    component: Operations,
    children: [
      {
        path: routesList.editOperation.path,
        name: routesList.editOperation.name,
        component: OperationForm,
      },
      {
        path: routesList.addOperation.path,
        name: routesList.addOperation.name,
        component: OperationForm,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
