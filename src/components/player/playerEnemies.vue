<template>
    <v-card class="ma-1" outlined tile sm="12">
        <v-card-title>
            <h2 class="subtitle-1">Сыгранные матчи</h2>
        </v-card-title>
        <v-row>
            <v-col v-for="team in items" :key="team.title" md="4">

                <v-data-table
                        :headers="headers"
                        :items="team.players"
                        :search="search"
                        :items-per-page="30"
                        hide-default-footer
                        hide-default-header
                        fixed-header
                >
                    <template v-slot:header="{ props: { }  }">
                        <thead>
                        <tr :style="getHeaderColor(team.title)">
                            <th colspan="2">
                                <v-chip class="primary-background" color="orange" label >
                                    {{team.title}}&nbsp;
                                </v-chip>
                            </th>
                        </tr>
                        </thead>
                    </template>
                    <template v-slot:item="{item}">
                        <tr v-if="item.status !== 'false'" :class="hasPlayAllGames(item.playedGames)">
                            <td class="enemy__name">
                                <router-link class="player__link d-inline-flex align-center"
                                             :to="translit(item.name)">{{item.name}}
                                </router-link>
                            </td>
                            <td>
                                <template v-if="Array.isArray(item.playedGames)">
                                    <div class="ma-1 gameBudge font-weight-bold"
                                         :class="getGameResultBudge(game.result)" v-for="(game, i) in item.playedGames"
                                         :key="i">
                                        {{game.result}}
                                    </div>
                                </template>
                                <template v-if="!Array.isArray(item.playedGames)">
                                    <div class="ma-1 gameBudge font-weight-bold">
                                        {{item.playedGames}}
                                    </div>
                                </template>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
  export default {
    name: 'playerEnemies',
    props: {
      items: Object,
      headers: Array
    },
    data: () => ({
      search: '',
      slots: ['header', 'item'],
    }),
    methods: {
      getGameResultBudge(result) {
        switch (result) {
          case 'W':
            return 'green darken-4';
          case 'L':
            return 'red darken-4';
        }
      },
      hasPlayAllGames(games) {
        if (Array.isArray(games) && games.length === 1) {
          return 'enemy-lineThroughed grey darken-1 grey--text--darken-2'
        }
      }
    },

  }
</script>
<style scoped>
    .gameBudge {
        display: inline-block;
        width: 1.4em;
        border-radius: 50%;
        text-align: center;
    }

   .player__block-enemies .v-data-table td {
        height: 2.6em;
    }
    .enemy-lineThroughed .player__link{
        color: #ccc;
        text-decoration: line-through;
    }
    .enemy__name {
        width: 60%;
    }
    th {
        background: transparent!important;
    }
    .v-chip.primary-background.v-chip.v-chip {
        background-color: #424242!important;
    }
</style>
