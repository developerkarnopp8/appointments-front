import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/Default.vue";
import {getItem as getItemLocal} from '@/util/localStorage';

Vue.use(VueRouter);

// let token = getItemLocal('accessToken')
const routes = [
  {
    path: "/",
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "Cadastro",
        path: "",
        component: () => import("../views/Cadastro.vue"),
        meta: {
          requiresAuth: false, // Esta rota requer autenticação
        },
      },
    ],
  },
  {
    path: "/login",
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "Login",
        path: "",
        component: () => import("../views/login.vue"),
        meta: {
          requiresAuth: false, // Esta rota requer autenticação
        },
      },
    ],
  },
  {
    path: `/dados-aniversariante/:id`,
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "Aniversariante",
        path: "",
        component: () => import("../views/DadosAniversario.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: `/todos-eventos/:id`,
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "TodosEventos",
        path: "",
        component: () => import("../views/TodosEventos.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/home-confirmacao/:id",
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("../views/HomeView.vue"),
        meta: {
          requiresAuth: false, // Esta rota requer autenticação
        },
      },
    ],
  },
  {
    path: "/sucesso/:id",
    component: Layout,
    props: {
      color: "transparent",
      absolute: true,
    },
    children: [
      {
        name: "Success",
        path: "",
        component: () => import("../views/Success.vue"),
        meta: {
          requiresAuth: false, // Esta rota requer autenticação
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  
  let token = getItemLocal('accessToken')

  let isAuthenticated = token ? token : false; // Obtenha o estado de autenticação do Vuex

  if (to.meta.requiresAuth && !isAuthenticated) {

    // Verifique se a rota requer autenticação e o usuário não está autenticado
    if (to.path !== '/') {

      // Verifique se o usuário não está tentando acessar a página de login

      router.push('/'); // Redirecione o usuário para a página de login ou qualquer outra página que você preferir

    } else {

      next(); // Prossiga com a navegação normalmente se o usuário já estiver na página de login

    }
  } else {

    next(); // Prossiga com a navegação normalmente

  }
});


export default router;

