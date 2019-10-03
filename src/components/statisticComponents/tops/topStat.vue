<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="4" v-for="table in topTables" :key="table.title">
            <top-table :title="table.title" :items="table.data"></top-table>
        </v-col>
    </v-row>
</template>
<script>
  import topTable from './topTable.vue';

  export default {
    name: 'statistics',
    components: {topTable},
    data: () => ({
      topTables: {
        utility: {title: 'Топ по полезности', data: {}},
        games: {title: 'Топ по матчам', data: {}},
        repeating: {title: 'Топ по повторным', data: {}},
        efficiency: {title: 'Топ по эффективности', data: {}},
      }
    }),
    mounted() {
      const topTables = this.topTables;
      const players = convertPlayersDataToFlat(this.ligueData); // развернём всех в плоский массив
      for (let key in topTables) {
        topTables[key].data = getTopData(players, key);
      }
    },
    computed: {
      ligueData() {
        return this.$store.getters.players;
      }
    },
  }
  const convertPlayersDataToFlat = (teams) => {
    const resultArray = [];
    for (let team in teams) {
      teams[team].players.forEach((player) => {
        resultArray.push(player);
      });
    }
    return resultArray;
  };
  const getTopData = (items, param) => {
    let sortParam = false;
    switch (param) {
      case 'utility':
        sortParam = 'points';
        break;
    }

    if (sortParam) {
      items.sort((a, b) => {
        if (a.sortParam < b.sortParam) {
          return 1;
        } else if (a[sortParam] > b[sortParam]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return items.slice(0, 15);
  }
</script>
