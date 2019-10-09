<template>
    <v-container class="pa-0" fill-height fluid>
        <v-layout>
            <v-row cols="12" sm="12">
            <v-col  cols="12" md="6">
                <v-card>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <h1 class="title">{{player.name}}</h1>
                        <v-chip class="pa-4 white--text" :style="getColor(player.division)">{{ player.team }}</v-chip>
                    </v-card-text>
                </v-card>
                <v-list disabled>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text">{{item.value}}</v-list-item-title>
                            </v-list-item-content>
                            {{item.value}}
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <played-games v-if="games" :headers="headersGames" :items="games" :player="player"></played-games>
            </v-col>
            <v-col  cols="12" md="6">
<player-enemies :headers="headersEnemies" :items="filteredItemsData"></player-enemies>
            </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>
<script>
  import {getPercentTotal} from '../../mixins/mixins';
  import playedGames from './playedGames.vue';
  import playerEnemies from './playerEnemies.vue';

  export default {
    name: "player",
    components: {playedGames, playerEnemies},
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
            value: "games",
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
          tmpDataObject = Object.assign({}, this.teams);
          delete tmpDataObject[currentPlayer.team];

          this.games.forEach((item) => {
            if (currentPlayer.name == item.player_1) {
              result.push({name: item.player_2, games: [{result: 'W'}]})
            } else {
              result.push({name: item.player_1, games: [{result: 'W'}]})
            }
          });

          for (let team in tmpDataObject) {
            let enemy = false;
            tmpDataObject[team].players.forEach((player) => {
              enemy = result.filter((enemy) => {
                return enemy.name == player.name;
              });

              if (enemy.length > 0) {
                player.games = enemy.games;
              } else {
                player.games = 0
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