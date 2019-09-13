import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
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
  render: h => h(App),
}).$mount('#app');
