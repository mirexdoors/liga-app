<template>
    <v-container class="pa-0" fill-height fluid>
        <v-layout column>
            <h1 class="title">Динамика набранных очков</h1>
            <preloader color="accent-4" v-if="!loaded"></preloader>
            <line-chart
                    class=""
                    v-if="loaded"
                    :chartData="chartData"
                    :options="options"/>
        </v-layout>
    </v-container>
</template>
<script>
  import lineChart from './charts/lineChart.vue';
  import preloader from '../components/preloader';

  export default {
    name: 'statistics',
    components: {lineChart, preloader},
    data: () => ({
      loaded: false,
      chartData: null,
      options: {
        spanGaps: true,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            generateLabels: function (chart) {
              const data = chart.data;
              return data.datasets.map(function (dataset, i) {
                let text = dataset.label;
                if (dataset.type === 'line') {
                  text = dataset.label + " (" + Chart.helpers.max(dataset.data).toLocaleString() + ")";
                }
                return {
                  text,
                  fillStyle: dataset.backgroundColor,
                  hidden: !chart.isDatasetVisible(i),
                  lineCap: dataset.borderCapStyle,
                  lineDash: dataset.borderDash,
                  lineDashOffset: dataset.borderDashOffset,
                  lineJoin: dataset.borderJoinStyle,
                  lineWidth: 2,
                  strokeStyle: dataset.borderColor,
                  pointStyle: dataset.pointStyle,
                  datasetIndex: i
                };
              }, this);

            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            display: true
          }]
        },
        animation: {
          onComplete: function () {
            const ctx = this.chart.ctx;
            if (window.outerWidth < 376) {
              ctx.font = Chart.helpers.fontString(8, 'normal', Chart.defaults.global.defaultFontFamily);
            } else {
              ctx.font = Chart.helpers.fontString(10, 'normal', Chart.defaults.global.defaultFontFamily);
            }
            ctx.fillStyle = "#d4ffff";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset) {
              if (dataset.type !== 'line') {
                for (let i = 0; i < dataset.data.length; i++) {
                  const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                  ctx.fillText(dataset.data[i], model.x, model.y - 5);
                }
              }
            });
          }
        },
      }
    }),
    async mounted() {
      this.loaded = false;
      const matchList = await fetch('http://mirexda2.beget.tech/get/stat/matches/')
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
