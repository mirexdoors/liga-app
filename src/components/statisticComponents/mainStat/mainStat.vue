<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="4" v-for="table in dataTables" :key="table.title">
            <main-stat-table :title="table.title" :items="table.values"></main-stat-table>
        </v-col>
    </v-row>
</template>

<script>
  import mainStatTable from './mainStatTable.vue';
  import {getGamesInfo, getDaysLeft, getDaysPassed} from '../../../mixins/mixins';

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
</script>
