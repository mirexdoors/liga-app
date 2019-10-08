import Vue from 'vue';
import Vuetify from 'vuetify';
import {shallowMount} from '@vue/test-utils';

Vue.use(Vuetify);

import addMatch from '../components/addMatch.vue';

describe ('test App', () => {
  it ('works', ()=> {
     shallowMount(addMatch);
  });
});