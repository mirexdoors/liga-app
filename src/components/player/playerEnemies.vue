<template>
    <v-card class="ma-1" outlined tile sm="12">
        <v-card-title>
            <h2 class="subtitle-1">Сыгранные матчи</h2>
        </v-card-title>
        <v-row>
            <v-col v-for="team in items" :key="team.title" md="6">
                <v-data-table
                        :headers="headers"
                        :items="team.players"
                        :search="search"
                        :items-per-page="30"
                        hide-default-footer
                        hide-default-header
                        fixed-header
                >
                    <template v-slot:header="{ props: { headers }  }">
                        <thead>
                        <tr>
                            <th colspan="2">
                                <v-chip color="orange" label outlined>{{team.title}}</v-chip>
                            </th>
                        </tr>
                        </thead>
                    </template>
                    <template v-slot:item="{item}">
                        <tr>
                            <td>
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
</style>