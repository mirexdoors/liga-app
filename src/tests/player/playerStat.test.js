import Vue from 'vue';
import Vuetify from 'vuetify';
import {shallowMount} from '@vue/test-utils';

Vue.use(Vuetify);

import component from '../../components/player/playerStat.vue';

describe ('test component', () => {
  it ('works', ()=> {
     shallowMount(component);
  });
});