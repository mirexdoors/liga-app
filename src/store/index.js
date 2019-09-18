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
    addMatchReuslt({ commit }, payload) {
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
              commit("setPlayers", data.players);
              resolve("Результат сохранен в базу");
            } else {
              reject("Ошибка сохранения результатов");
            }
          })
          .catch((error) => reject(error));
      });
    }
  }
});