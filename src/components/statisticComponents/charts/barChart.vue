<script>
  import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
    props: {
      chartData: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    mounted() {
      const wW = window.outerWidth;
      const canvasWidth = wW - 25;
      let canvasHeight = 400;
      if (wW > 374 && wW < 800) {
        canvasHeight = 200;
      }
      const canvasContainer = document.getElementById('bar-chart');
      if (canvasContainer) {
        canvasContainer.getContext("2d").canvas.width = canvasWidth;
        canvasContainer.getContext("2d").canvas.height = canvasHeight;
      }
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
