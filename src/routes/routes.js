import Vue from 'vue';
import VueRouter from 'vue-router';
import ligue from '../components/ligue';
import player from '../components/player';
import allGames from '../components/allGames';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ligue
    },
    {
      path: '/all',
      component: allGames,
    },
    {
      path: '/:playername',
      component: player
    },
  ]
});