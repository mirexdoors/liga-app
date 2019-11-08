<template>
    <v-container class="pa-0" fill-height fluid>
        <div class="player__container">
            <div class="player__block player__block-main">
            <v-card>
                <v-card-text class="d-flex justify-space-between align-center">
                    <h1 class="title">{{player.name}}</h1>
                    <v-chip class="pa-4 white--text" :style="getColor(player)">{{ player.team }}
                    </v-chip>
                </v-card-text>
                <v-card-text  class="d-flex display-2 justify-space-between align-center" v-if="player.status === 'false'">
                    <p class="text-center">Игрок выбыл из лиги 😞</p>
                </v-card-text >
            </v-card>

                <player-stat v-if="player.status !== 'false'" :items="items"></player-stat>
            </div>
            <div v-if="player.status !== 'false'" class="player__block player__block-enemies">
                <player-enemies :headers="headersEnemies" :items="filteredItemsData"></player-enemies>
            </div>
            <div v-if="player.status !== 'false'" class="player__block player__block-games">
                <played-games v-if="games" :headers="headersGames" :items="games" :player="player"></played-games></div>
        </div>
    </v-container>
</template>
<script>
  import {getPercentTotal} from '../../mixins/mixins';
  import playedGames from './playedGames.vue';
  import playerEnemies from './playerEnemies.vue';
  import playerStat from './playerStat.vue';

  export default {
    name: "player",
    components: {playedGames, playerEnemies, playerStat},
    data() {
      return {
        headersEnemies: [
          {
            text: "Игрок",
            align: "left",
            sortable: false,
            value: "name",
          },
          {
            text: "Матчи",
            align: "left",
            sortable: false,
            value: "playedGames",
          },
        ],
        headersGames: [
          {
            text: '',
            align: "left",
            sortable: false,
            value: "player_1"
          },
          {text: "", value: "player_2", align: "left", sortable: false},
          {text: "Счёт", value: "score", align: "left"},
          {text: "Дата", value: "date", align: "left"},
        ],
      };
    },
    computed: {
      teams() {
        return this.$store.getters.players;
      },
      player() {
        if (this.$store.state.detailPlayer) {
          return this.$store.state.detailPlayer;
        } else {
          const playerName = this.$route.params.playername;

          /*find player in vuex*/
          let detailPlayer = null;
          this.$store.dispatch("setDetailPlayer", null);
          for (const team in this.teams) {
            detailPlayer = this.teams[team].players.filter(item => {
              if (this.translit(item.name) === playerName) return item;
            })[0];

            if (detailPlayer) {
              this.$store.dispatch("fetchDetailGames", detailPlayer.id);
              this.$store.dispatch("setDetailPlayer", detailPlayer);
              break;
            }
          }
          return detailPlayer;
        }
      },
      items() {
        if (this.$store.state.detailPlayer) {
          const player = this.$store.state.detailPlayer;
          return [
            {text: "Дивизион", value: player.division},
            {text: "Игры", value: player.games},
            {text: "Уникальные игры", value: player.unique_games},
            {text: "Очки", value: player.points},
            {
              text: "Очков за игру ср.",
              value: !isNaN((player.points / player.games).toFixed(2)) ? (player.points / player.games).toFixed(2) : "0"
            },
            {text: "% от очков команды", value: getPercentTotal(player, this.teams), align: "left"}
          ];
        } else {
          return false;
        }
      },
      games() {
        return this.$store.state.detailGames;
      },
      filteredItemsData() {
        let tmpDataObject;
        if (this.games && this.teams) {
          const result = [];
          const currentPlayer = this.player;
          const tmpEnemies = new Set();
          tmpDataObject = Object.assign({}, this.teams);
          delete tmpDataObject[currentPlayer.team];

          this.games.forEach((item) => {
            //проверяем, есть ли уже записанный матч

            const gameResultObj = {name: String, games: []};
            if (currentPlayer.name === item.player_1) {
              if (!tmpEnemies.has(item.player_2)) { //если нет матча с этим игроком в массиве матчей
                tmpEnemies.add(item.player_2);
                gameResultObj.name = item.player_2;
                if (item.score_1 > item.score_2) {
                  gameResultObj.games.push({result: 'W'});
                } else {
                  gameResultObj.games.push({result: 'L'});
                }
              } else { //если есть матч с этим игроком в массиве матчей, ищем его
                result.forEach((enemy) => {
                  if (enemy.name === item.player_2) {
                    if (item.score_1 > item.score_2) {
                      enemy.games.push({result: 'W'});
                    } else {
                      enemy.games.push({result: 'L'});
                    }
                  }
                });
              }
            } else {
              if (!tmpEnemies.has(item.player_1)) {
                tmpEnemies.add(item.player_1);
                gameResultObj.name = item.player_1;
                if (item.score_1 > item.score_2) {
                  gameResultObj.games.push({result: 'L'});
                } else {
                  gameResultObj.games.push({result: 'W'});
                }
              } else {
                result.forEach((enemy) => {
                  if (enemy.name === item.player_1) {
                    if (item.score_1 > item.score_2) {
                      enemy.games.push({result: 'L'});
                    } else {
                      enemy.games.push({result: 'W'});
                    }
                  }
                });
              }
            }
            result.push(gameResultObj);
          });

          for (let team in tmpDataObject) {
            let enemy = false;
            tmpDataObject[team].players.forEach((player) => {
              enemy = result.filter((enemy) => {
                return enemy.name == player.name;
              });
              if (enemy.length > 0) {
                player.playedGames = enemy[0].games;
              } else {
                player.playedGames = "🕛";
              }

            });
          }
        }
        return tmpDataObject;
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.detailPlayer = this.$store.state.detailGames = null;
      next();
    },
    beforeRouteUpdate(to, from, next) {
      const playerName = to.params.playername;
      /*find player in vuex*/
      let detailPlayer = null;
      this.$store.dispatch("setDetailPlayer", null);
      for (const team in this.teams) {

        detailPlayer = this.teams[team].players.filter(item => {
          if (this.translit(item.name) === playerName) return item;
        })[0];
        if (detailPlayer) {
          this.$store.dispatch("fetchDetailGames", detailPlayer.id);
          this.$store.dispatch("setDetailPlayer", detailPlayer);
          break;
        }
      }
      next();
    },
    watch: {
      player() {
        this.games = this.$store.state.detailGames;
      },
      games() {
        return this.$store.state.detailGames;
      },
    },
  }
</script>
<style scoped>
    .player__container {
        display: grid;
        grid-gap: 2em;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, minmax(0, min-content));
        width: 100%;
    }
    .player__block-main {
        grid-column: 1;
    }
    .player__block-games {
        grid-column: 1;
    }

    .player__block-enemies {
        grid-row: 1 / 4;
        grid-column: 2;
    }

    @media screen and (max-width: 600px) {
        .player__block-enemies {
            grid-column: 1;
        }
        .player__block-enemies {
            grid-row: 2;
        }
    }
</style>