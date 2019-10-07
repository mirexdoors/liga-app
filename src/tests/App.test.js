import {shallowMount} from '@vue/test-utils';
import App from '../App.vue';

describe ('test App', () => {
  it ('works', ()=> {
     shallowMount(App);
  });
});