import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    players: null,
    detailPlayer: null,
  },
  getters: {
    players(state) {
      return state.players;
    },
    detailPlayer(state) {
      return state.detailPlayer;
    },
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
    },
    setDetailPlayer(state, player) {
      state.detailPlayer = player;
    },
  },
  actions: {
    setDetailPlayer({commit}, player) {
      commit('setDetailPlayer', player);
    },
    fetchPlayers({ commit }, url) {
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

    },
    addMatchReuslt({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (const propName in payload.data ) {
          formData.append(propName,payload.data[propName]);
        }
        fetch(payload.url, {
          method: "post",
          body: formData
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status) {
              const apiPlayerUrl = "http://mirexda2.beget.tech/get/players/";
              dispatch("fetchPlayers", apiPlayerUrl);
              resolve();
            } else {
              reject("Ошибка сохранения результатов");
            }
          })
          .catch((error) => reject(error));
      });
    }
  }
});