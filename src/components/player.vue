<template>
    <v-container fill-height fluid>
        <v-layout column>
            <v-col md="6">
                <v-card>
                    <v-card-text>
                        <h1>{{player.name}}</h1>
                    </v-card-text>
                </v-card>

                <v-list disabled>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text">{{item.value}}</v-list-item-title>
                            </v-list-item-content>
                            <v-chip
                                    class="ma-2"
                                    :style="getColor(player.division)"
                                    text-color="white"
                            >{{item.value}}
                            </v-chip>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                {{games}}
                <v-data-table
                        :headers="headers"
                        :items="games"
                        :search="search"
                        :items-per-page="20"
                        dark
                ></v-data-table>
            </v-col>
        </v-layout>
    </v-container>
</template>
<script>
  export default {
    name: "player",
    data() {
      return {
        search: '',
        headers: [
          {
            text: '',
            align: "left",
            sortable: false,
            value: "player_1"
          },
          {text: "", value: "player_2", align: "left", sortable: false},
          {text: "Счёт", value: "score", align: "left"},
          {text: "Дата", value: "date", align: "left"}
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
            {text: "Команда", value: player.team},
            {text: "Дивизион", value: player.division},
            {text: "Игры", value: player.games},
            {text: "Уникальные игры", value: player.unique_games},
            {text: "Очки", value: player.points}
          ];
        } else {
          return false;
        }
      },
      games() {
        if (this.player) {
          const apiMatchesUrl = "http://mirexda2.beget.tech/get/matches/?id=" + this.player.id;
          fetch(apiMatchesUrl)
          .then(response => {
            return response.json();
          })
          .then(matchesJSON => {
            return matchesJSON.matches;
          });
        }
      },
    },
  }
</script>