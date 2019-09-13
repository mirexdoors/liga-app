import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    players: null,
  },
  getters: {
    players(state) {
      return state.players;
    }
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
    }
  },
  actions: {
    fetchPlayers({commit}, url) {
      let result = [];
      fetch(url, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          result = responseJSON.players;
          if (result) {
            commit('setPlayers', result);
          }
        });

    }
  }
});