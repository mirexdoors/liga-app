import Vue from 'vue';
import Vuetify from 'vuetify';
import {shallowMount} from '@vue/test-utils';

import component from '../../../components/statisticComponents/charts/lineChart.vue';

describe ('test component', () => {
  it ('works', ()=> {
    shallowMount(component);
  });
});