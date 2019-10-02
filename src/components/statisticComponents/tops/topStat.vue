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
    })
  }
</script>
