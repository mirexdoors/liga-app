import Vue from 'vue';
import Vuex from 'vuex';
import {API_URL} from "../mixins/mixins";
import routes from '../routes/routes'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        players: null,
        detailPlayer: null,
        detailGames: null,
        isAdmin: false,
        games: [],
    },
    getters: {
        detailGames(state) {
            return state.detailGames;
        },
        players(state) {
            return state.players;
        },
        detailPlayer(state) {
            return state.detailPlayer;
        },
        getAdmin(state) {
            return state.isAdmin;
        },
        getGames(state) {
            return state.games;
        }
    },
    mutations: {
        setPlayers(state, players) {
            state.players = players;
        },
        setDetailPlayer(state, player) {
            state.detailPlayer = player;
        },
        setDetailGame(state, games) {
            state.detailGames = games;
        },
        setAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
        setGames(state, games) {
            state.games = games;
        }
    },
    actions: {
        fetchDetailGames({commit}, playerId) {
            let apiMatchesUrl = API_URL + "/get/games/?id=" + playerId;

            if (routes.currentRoute.query.test === '1') {
                apiMatchesUrl += '&test=1'
            }
            fetch(apiMatchesUrl)
                .then(response => {
                    return response.json();
                })
                .then(matchesJSON => {
                    commit('setDetailGame', matchesJSON.games);
                });
        },
        setDetailPlayer({commit}, player) {
            commit('setDetailPlayer', player);
        },
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

        },
        addMatchResult({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                for (const propName in payload.data) {
                    formData.append(propName, payload.data[propName]);
                }
                fetch(payload.url, {
                    method: "post",
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status) {
                            let apiPlayerUrl = API_URL + "/get/players/";
                            if (routes.currentRoute.params.test === '1') {
                                apiPlayerUrl += '?test=1'
                            }
                            dispatch("fetchPlayers", apiPlayerUrl);
                            resolve();
                        } else {
                            reject("Ошибка сохранения результатов");
                        }
                    })
                    .catch((error) => reject(error));
            });
        },
        fetchGames({commit}) {
            let apiMatchesUrl = API_URL + "/get/games/all/";
            if (routes.currentRoute.params.test === '1') {
                apiMatchesUrl+= '?test=1'
            }
            fetch(apiMatchesUrl)
                .then(response => {
                    return response.json();
                })
                .then(matchesJSON => {
                    commit("setGames", matchesJSON.games);
                });
        },
        deleteGame(context, payload) {
            return new Promise((resolve, reject) => {
                const apiDeleteMatchesUrl = API_URL + "/post/delete/";
                const formData = new FormData();
                formData.append('action', 'delete')
                formData.append('id', payload.id);
                fetch(apiDeleteMatchesUrl, {
                    method: "post",
                    body: formData,
                })
                    .then(response =>  response.json())
                    .then((response) => {
                            if (response.status) return resolve()
                            return reject("Не удалось удалить игру")
                        }
                    )
                    .catch(error => reject(error));
            });
        },
    }
});
