import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {store} from "./store/index";
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';

Vue.use(Vuex);
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    theme: {dark: true},
    icons: {
      iconfont: 'mdiSvg'
    }
  }),
  store,
  render: h => h(App),
}).$mount('#app');
