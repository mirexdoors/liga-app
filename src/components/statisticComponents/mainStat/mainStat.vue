<template>
		<div class="my-4 my-lg-0">
			<div
				v-for="table in dataTables"
				:key="table.title"
			>
				<main-stat-table
					:title="table.title"
					:items="table.values"
				/>
			</div>
		</div>
</template>

<script>
  import mainStatTable from './mainStatTable.vue';
  import {setGamesInfo, getDaysLeft, getDaysPassed} from '@/mixins/mixins';

  export default {
    name: "mainStat",
    components: {mainStatTable},
    data: () => ({
      dataTables: {
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
      // getGamesInfoWithUniqs(this.ligueData, dataTables.allGames.values, dataTables.uniqGames.values);
      setGamesInfo(this.ligueData, dataTables.allGames.values);
    },
    computed: {
      ligueData() {
        return this.$store.getters.players;
      }
    },
  }
</script>
