import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './views/login/viewsLogin.vue';
import Erro404 from './views/viewsErro404.vue';
import EventBus from './event-bus';

// Lazy loading - importação de components assíncronos
const Contatos = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatos.vue');
const ContatosHome = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosHome.vue');
const ContatosDetalhes = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosDetalhes.vue');
const ContatosEditar = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosEditar.vue');
const ContatosAdicionar = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosAdicionar.vue');
const ContatosExcluir = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosExcluir.vue');
const ContatosErro404 = () => import(/* webpackChunkName: "contatos"*/'./views/contatos/viewsContatosErro404.vue');
const Home = () => import('./views/viewsHome.vue');

Vue.use(VueRouter);

const extractParamsId = route => ({ id: parseInt(route.params.id)});

const router = new VueRouter({
  mode:'history',
  linkActiveClass:'active',
  // scrollBehavior(to, from, savedPosition){
  //   return new Promise((resolve) =>{
  //     setTimeout(() => {
  //       if(savedPosition){
  //         return resolve(savedPosition);
  //       }
  //       if(to.hash){
  //         return resolve({
  //           selector: to.hash,
  //           offset: { x: 0, y: 0}
  //         });
  //       }
  //       resolve({ x: 0, y: 0});
  //     }, 3000);
  //   });
  // },
  routes: [
    {
      path: '/contatos',
      component: Contatos,
      alias: ['/meus-contatos', '/lista-de-contatos', '/nosso-contatos', 'todos-contataos'],
      children: [
        { path: 'adicionar', component: ContatosAdicionar, name: 'adicionar-contato'},
        {
          path: ':id(\\d+)',
          component: ContatosDetalhes,
          name: 'contato',
          props: extractParamsId
        }, // rota aninhada - filha de contatos

        {
          // path: ':id(\\d+)/editar/:opcional?',
          // path: ':id(\\d+)/editar/:zeroOuMais*',
          // path: ':id(\\d+)/editar/:umOuMais+',
          path: ':id(\\d+)/editar',
          meta: { requireAuth: true }, // verifica se requer autenticação
          beforeEnter(to, from, next){
            next();
          },
          components: {
            default: ContatosEditar,
            'contato-detalhes': ContatosDetalhes
          },
          props:{
              default: extractParamsId,
              routeContatoDetalhes: extractParamsId,
          }
        }, //http://localhost:8080/contatos/2/editar
        {
          path: ':id(\\d+)/excluir',
          meta: { requireAuth: true },
          beforeEnter(to, from, next){
            const val = EventBus.excluirContato(parseInt(to.params.id));
            next(val);
          },
          component: ContatosExcluir,
          props: extractParamsId
        },
        {
          path: '',
          component: ContatosHome,
          name: 'contatos',
          props: (route) =>{
            const busca = route.query.busca;
            return busca ? { busca } : {};
          },
        }, // rota irmã de aninha - filha de contatos

        { path: '*', component: ContatosErro404 }
      ]
    },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/', redirect: () => { return { name: 'contatos' }}}, // função para redirecionamento de rotas
    { path: '*', component: Erro404 }
  ]
});

// antes de criar instancia percorre todas as rotas
router.beforeEach((to, from, next) =>{
  const estaAutenticado = EventBus.autenticado;

  // realiza a validação das rotas que precisa de auth
  if(to.matched.some(rota => rota.meta.requireAuth)){
    if(!estaAutenticado){
      next({
        path: '/login',
        query: { redirecionar: to.fullPath }
      });
      return;
    }
  }
  next();
});

// depois que resolver a instancia dos components
// router.beforeResolve((to, from, next) =>{
//   console.log('beforeResolve');
//   next();
// });

// depois que percorrer todas as rotas
// router.afterEach((to, from) =>{
//   console.log('afterEach');
// });

export default router;

/**
 * Guardas de Rotas:
 * Guardas de rotas são configuradas na instância da rota - root, devem ser exportada como variáveis
 */
