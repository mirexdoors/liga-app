<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="6" v-for="table in topTables" :key="table.title">
            <top-table :title="table.title" :items="table.data" :param="table.param"></top-table>
        </v-col>
    </v-row>
</template>
<script>
  import topTable from './topTable.vue';
  import {getTopData, convertPlayersDataToFlat} from '../../../mixins/mixins';

  export default {
    name: 'statistics',
    components: {topTable},
    data: () => ({
      topTables: {
        utility: {title: 'Топ по полезности', data: {}, param: ''},
        games: {title: 'Топ по матчам', data: {}, param: ''},
        repeating: {title: 'Топ по повторным', data: {}, param: ''},
        efficiency: {title: 'Топ по эффективности (*больше 10 матчей)', data: {}, param: ''},
      }
    }),
    mounted() {
      const topTables = this.topTables;
      const players = convertPlayersDataToFlat(this.ligueData); // развернём всех в плоский массив
      let sortParam = null;
      for (let key in topTables) {
        switch (key) {
          case 'utility':
            sortParam = 'points';
            break;
          case 'games':
            sortParam = 'games';
            break;
          case 'repeating':
            sortParam = 'repeatGames';
            break;
          case 'efficiency':
            sortParam = 'efficiency';
            break;
        }
        topTables[key].data = getTopData(players, sortParam);
        topTables[key].param = sortParam;
      }
    },
    computed: {
      ligueData() {
        return this.$store.getters.players;
      }
    },
  }
</script>
