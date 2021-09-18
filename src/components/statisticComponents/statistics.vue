<template>
	<v-container
		class="pa-0"
		fill-height
		fluid>
		<v-layout column>
			<h1 class="title pa-2">Статистика</h1>
			<v-row>
				<v-col cols="12" sm="4">
					<v-card class="pa-2 pb-8">
						<v-card-title>
							<h2 class="subtitle-1">Статистика лиги</h2>
						</v-card-title>
						<main-stat/>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					sm="8"
					class="mb-4"
				>
					<v-card class="pa-2 mb-2">
						<v-card-title>
							<h2 class="subtitle-1">Динамика набранных очков</h2>
						</v-card-title>
						<preloader
							v-if="!loaded"
							color="accent-4"
						/>

						<line-chart
							v-if="loaded"
							:chartData="line.chartData"
							:options="line.options"
						/>
					</v-card>

					<v-card class="pa-2">
						<v-card-title>
							<h2 class="subtitle-1">Распределение матчей по дням</h2>
						</v-card-title>

						<preloader
							color="accent-4"
							v-if="!loaded"/>
						<bar-chart
							v-if="loaded"
							:chartData="bar.chartData"
							:options="bar.options"></bar-chart>
					</v-card>
				</v-col>
			</v-row>

			<v-card>
				<v-card-title>
					<h2 class="subtitle-1">Топ-10</h2>
				</v-card-title>
				<top-stat/>
			</v-card>
		</v-layout>
	</v-container>
</template>
<script>
  import Chart from 'chart.js'
  import lineChart from './charts/lineChart.vue';
  import barChart from './charts/barChart.vue';
  import preloader from '../preloader';
  import mainStat from './mainStat/mainStat';
  import topStat from './tops/topStat.vue';

  export default {
    name: 'statistics',
    components: {
      lineChart,
      barChart,
      preloader,
      topStat,
      mainStat,
    },
    data: () => ({
      loaded: false,
      line: {
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
                  let text = dataset.label + " (" + Chart.helpers.max(dataset.data).toLocaleString() + ")";
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
        }
      },
      bar: {
        chartData: null,
        options: {
          spanGaps: true,
          responsive: true,
          maintainAspectRatio: false,
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
                for (let i = 0; i < dataset.data.length; i++) {
                  const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                  ctx.fillText(dataset.data[i], model.x, model.y - 5);
                }
              });
            }
          },
        },
      },
    }),
    async mounted() {
      this.loaded = false;
      const matchList = await fetch('http://league.sibsquash.ru/get/stat/matches/')


          .then(response => {
            return response.json();
          })
          .then(matchesJSON => {
            return matchesJSON;
          });
      this.line.chartData = matchList.games;
      this.bar.chartData = matchList.bar;
      this.loaded = true;
    },
    computed: {
      getAdmin() {
        return this.$store.getters.getAdmin;
      }
    },
  }
</script>
