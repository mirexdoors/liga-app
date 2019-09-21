<template>
    <v-card>
        <v-card-title>
            {{currentDate}}
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
        </v-card-title>
        <v-container>
            <v-row no-gutters>

                <v-col v-for="team in teams" v-bind:key="team.title" cols="12"
                       sm="4">
                    <v-card class="ma-1" outlined tile>
                        <v-data-table
                                class="elevation-5"
                                :headers="headers"
                                :items="team.players"
                                :search="search"
                                :items-per-page="30"
                                hide-default-footer
                                dark
                        >
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                <tr>
                                    <th :colspan="headers.length">
                                        <v-chip
                                                color="orange"
                                                label
                                                outlined
                                        >
                                            {{team.title}}
                                        </v-chip>
                                    </th>
                                </tr>
                                </thead>
                            </template>

                            <template v-slot:item="{item}">
                                <tr :style=" getColor(item.division)">
                                    <td class="player__name">
                                        <router-link class="player__link" :to="translit(item.name)">{{item.name}}
                                        </router-link>
                                    </td>
                                    <td class="player__games">
                                        <router-link class="player__link" :to="translit(item.name)">{{item.unique_games
                                            ? item.unique_games : 0 }}
                                        </router-link>
                                    </td>
                                    <td class="player__games">
                                        <router-link class="player__link" :to="translit(item.name)">{{item.games ?
                                            item.games : 0}}
                                        </router-link>
                                    </td>
                                    <td class="player__points">
                                        <router-link class="player__link" :to="translit(item.name)">{{item.points ?
                                            item.points : 0}}
                                        </router-link>
                                    </td>
                                </tr>
                            </template>

                            <template v-slot:footer>
                                <div class="table__footer pa-2 d-flex justify-space-between">
                                    <div class="table__footerName">
                                        <strong>Итого</strong>
                                    </div>
                                    <div class="table__footerValue">
                                        <v-chip
                                                color="orange"
                                                text-color="white"
                                        >
                                            {{team.total.toFixed(1)}}
                                            <v-icon right>star</v-icon>
                                        </v-chip>
                                    </div>
                                </div>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
  export default {
    name: "ligue",
    props: {},
    data() {
      return {
        currentDate: new Date().toLocaleString("ru", {
          month: "long",
          day: "numeric",
          weekday: "long",
          timezone: "UTC"
        }),
        search: "",
        slots: [
          'header',
          'progress',
          'body.append',
          'footer',
        ],
        headers: [
          {
            text: "Игрок ",
            align: "left",
            sortable: false,
            value: "name",
          },
          {text: "Матчи", value: "games"},
          {text: "Ун. матч", value: "unique_games"},
          {text: "Очки", value: "points"}
        ],
      };
    },
    computed: {
      teams() {
        return this.$store.getters.players;
      },
    },
    beforeRouteLeave(to, from, next) {
      const playerName = to.params.playername;
      /*find player in vuex*/
      let detailPlayer = null;
      this.$store.dispatch('setDetailPlayer', null);
      for (const team in this.teams) {
        detailPlayer = this.teams[team].players.filter(item => {
          if (this.translit(item.name) === playerName) return item;
        });
        if (detailPlayer.length > 0) {
          this.$store.dispatch('setDetailPlayer', detailPlayer);
          break;
        }
      }
      next();
    }
  };
</script>

<style scoped>
    .player__name, .player__games, .player__points {
        padding: 0;
    }

    .player__name {
        width: 34%;
    }

    .player__games {
        width: 17%;
    }

    .player__points {
        width: 20%;
    }

    .player__link {
        display: block;
        width: 100%;
        color: inherit;
        text-decoration-line: none;
        padding: 0 10px;
    }
</style>