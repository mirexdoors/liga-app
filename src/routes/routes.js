import Vue from 'vue';
import VueRouter from 'vue-router';
import ligue from '../components/ligue.vue';
import player from '../components/player/player.vue';
import allGames from '../components/allGames/allGames.vue';
import statistics from '../components/statisticComponents/statistics.vue';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ligue,
    },
    {
      path: '/stat',
      component: statistics,
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