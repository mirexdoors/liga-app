import Vue from 'vue';
import Vuetify from 'vuetify';
import {shallowMount} from '@vue/test-utils';

Vue.use(Vuetify);

import component from '../../components/statisticComponents/statistics.vue';
global.fetch = require('jest-fetch-mock');
describe ('test component', () => {
  it ('works', ()=> {
     shallowMount(component);
  });
});