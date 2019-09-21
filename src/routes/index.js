import Vue from 'vue';
import VueRouter from 'vue-router';
import ligue from '../components/ligue';
import player from '../components/player';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ligue
    },
    {
      path: '/:playername',
      component: player
    }
  ]
});