<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,
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
      let canvasHeight = window.outerHeight - 600;
      if (wW > 374 && wW < 800) {
        canvasHeight = window.outerHeight - 500;
      }
      const canvasContainer = document.getElementById('line-chart');
      if (canvasContainer) {
        canvasContainer.getContext("2d").canvas.width = canvasWidth;
        canvasContainer.getContext("2d").canvas.height = canvasHeight;
      }
      if (this.chartData) {
        this.renderChart(this.chartData, this.options);
      }
    }
  }
</script>
