<template>
    <v-container class="pa-0" fill-height fluid>
        <v-layout  column>
            <v-col  md="6">
                <v-card>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <h1 class="title">{{player.name}}</h1>
                        <v-chip
                                class="pa-4"
                                :style="getColor(player.division)"
                                text-color="white"
                        >{{player.team}}
                        </v-chip>
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
                <v-text-field v-model="search" append-icon="search" label="Поиск" single-line
                              hide-details></v-text-field>

                <v-data-table
                        v-if="games"
                        :headers="headers"
                        :items="games"
                        :search="search"
                        :items-per-page="10"
                        dark
                >
                    <template v-slot:item.player_1="{ item }">
                        <span :class="changePlayerFont(item.player_1)">{{item.player_1}}</span>
                    </template>
                    <template v-slot:item.player_2="{ item }">
                        <span :class="changePlayerFont(item.player_2)">{{item.player_2}}</span>
                    </template>
                    <template v-slot:item.score="{ item }">
                        <div class="flex-column d-flex pa-md-2 align-self-center">
                            <v-chip label outlined class="d-flex justify-center">{{item.score}}</v-chip>
                            <div class="player__points font-italic d-flex justify-center">{{item.points}}</div>
                        </div>
                    </template>
                </v-data-table>
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
          {text: "Дата", value: "date", align: "left"},
        ],
        slots: [
          'body',
        ]
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
            {text: "% от очков команды", value: getPercentTotal(player, this.teams), align: "left"}
          ];
        } else {
          return false;
        }
      },
      games() {
        return this.$store.state.detailGames;
      },
    },
    watch: {
      player() {
        this.games = this.$store.state.detailGames;
      },
    },
    methods: {
      changePlayerFont(playerName) {
        if (playerName == this.player.name) {
          return 'font-weight-bold orange--text darken-2';
        }
      },
    },
  }

  const getPercentTotal = (player, teams) => {
    const points = player.points;
    const totalTeamPoints = teams[player.team].total;
    return ((points / totalTeamPoints) * 100).toFixed(2) + "%";
  }
</script>
<style scoped>
.player__points {
    font-size: 12px;
}
</style>