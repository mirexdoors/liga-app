import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {store} from "./store/index";
import router from './routes';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont';
import {translit} from "./mixins/index";
import {getColor} from "./mixins/index";

Vue.use(Vuex);
Vue.use(Vuetify);

Vue.mixin({
  methods: {
    translit,
    getColor
  }
});

new Vue({
  vuetify: new Vuetify({
    theme: {dark: true},
    icons: {
      iconfont: 'mdiSvg'
    }
  }),
  store,
  router,
  render: h => h(App),
}).$mount('#app');
