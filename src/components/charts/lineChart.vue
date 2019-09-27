<script>
  import {Line, Bar} from 'vue-chartjs'

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
      let canvasHeight = window.outerHeight - 150;
      if (wW > 800) {
        canvasHeight = window.outerHeight - 150;
      } else if (wW > 374) {
        canvasHeight = window.outerHeight - 300;
      }
      const canvasContainer = document.getElementById('line-chart');
      if (canvasContainer) {
        canvasContainer.getContext("2d").canvas.width = canvasWidth;
        canvasContainer.getContext("2d").canvas.height = canvasHeight;
      }
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
