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
      path: '/autumn-2019/',
      component: ligue,
    },
    {
      path: '/autumn-2019/stat',
      component: statistics,
    },
    {
      path: '/autumn-2019/all',
      component: allGames,
    },
    {
      path: '/autumn-2019/:playername',
      component: player
    },
  ]
});