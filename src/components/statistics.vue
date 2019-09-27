<template>
    <v-container class="d-flex flex-column align-center justify-center">
        <h1 class="title">Статистика</h1>
        <div class="caption">Coming soon ...</div>
        <line-chart
                v-if="loaded"
                :chartData="chartData"
                :options="options"/>
    </v-container>
</template>
<script>
  import lineChart from './charts/lineChart.vue';

  export default {
    name: 'statistics',
    components: {lineChart},
    data: () => ({
      loaded: false,
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }),
    async mounted() {
      this.loaded = false;
      const matchList = await fetch('http://mirexda2.beget.tech/get/games/all/')
      .then(response => {
        return response.json();
      })
      .then(matchesJSON => {
        return matchesJSON.games;
      });
      this.chartData = matchList;
      this.loaded = true;

    }
  }
</script>