<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="4" v-for="table in dataTables" :key="table.title">
            <main-stat-table :title="table.title" :items="table.values"></main-stat-table>
        </v-col>
    </v-row>
</template>

<script>
  import mainStatTable from './mainStatTable.vue';

  export default {
    name: "mainStat",
    components: {mainStatTable},
    data: () => ({
      dataTables: {
        uniqGames: {
          title: 'Уникальные матчи',
          values: {
            gamesPlayed: {title: 'Сыграно матчей', value: null},
            gamesLeft: {title: 'Осталось матчей', value: null},
            percentOfMax: {title: '% от максимума', value: null},
          }
        },
        allGames: {
          title: 'Все матчи',
          values: {
            gamesPlayed: {title: 'Сыграно матчей', value: null},
            gamesLeft: {title: 'Осталось матчей', value: null},
            percentOfMax: {title: '% от максимума', value: null},
          }
        },
        ligueTime: {
          title: 'Время лиги',
          values: {
            daysPassed: {title: 'Прошло дней', value: null},
            daysLeft: {title: 'Осталось дней', value: null},
            percentOfAllTime: {title: '% от времени', value: null},
          }
        }
      },
    }),
    mounted() {
      const dataTables = this.dataTables;
      dataTables.ligueTime.values.daysPassed.value = getDaysPassed();
      dataTables.ligueTime.values.daysLeft.value = getDaysLeft();
      dataTables.ligueTime.values.percentOfAllTime.value = ((dataTables.ligueTime.values.daysPassed.value / (dataTables.ligueTime.values.daysLeft.value + dataTables.ligueTime.values.daysPassed.value)) * 100).toFixed(1) + '%';
      getGamesInfo(this.ligueData, dataTables.allGames.values, dataTables.uniqGames.values);
    },
    computed: {
      ligueData() {
        return this.$store.getters.players;
      }
    },
  }
  const getGamesInfo = (data, allGames, uniqGames) => {
    const ALL_POSSIBLE_MATCHES = 4356;
    const ALL_POSSIBLE_MATCHES_UNIQ = 1452;
    let totalMatches = 0;
    let uniqMatches = 0;
    for (let team in data) {
      totalMatches += data[team]['total_games'];
      uniqMatches += data[team]['total_unique_games'];
    }

    allGames.gamesPlayed.value = totalMatches / 2;
    allGames.gamesLeft.value = ALL_POSSIBLE_MATCHES - totalMatches / 2;
    allGames.percentOfMax.value = (((totalMatches / 2) / ALL_POSSIBLE_MATCHES) * 100).toFixed(2) + '%';
    uniqGames.gamesPlayed.value = uniqMatches / 2;
    uniqGames.gamesLeft.value = ALL_POSSIBLE_MATCHES_UNIQ - uniqMatches / 2;
    uniqGames.percentOfMax.value = (((uniqMatches / 2) / ALL_POSSIBLE_MATCHES_UNIQ) * 100).toFixed(2) + '%';

    return true;
  };
  const getDaysPassed = () => {
    const d0 = new Date('September 01, 2019 00:00:00');
    const d1 = new Date();
    return Math.round((d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24) + 1);
  };
  const getDaysLeft = () => {
    const d0 = new Date('December 13, 2019');
    const d1 = new Date();
    return Math.round((d0.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }
</script>
