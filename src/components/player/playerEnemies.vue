<template>
    <v-card class="ma-1" outlined tile sm="12">
        <v-card-title>
            <h2 class="subtitle-1">Сыгранные матчи</h2>
        </v-card-title>
        <v-row>
        <v-col v-for="team in items" md="6">
            <v-data-table
                    :headers="headers"
                    :items="team.players"
                    :search="search"
                    :items-per-page="30"
                    hide-default-footer
                    fixed-header
            >
                <template v-slot:header="{ props: { headers }  }">
                    <thead>
                    <tr>
                        <th colspan="2">
                            <v-chip color="orange" label outlined>{{team.title}}</v-chip>
                        </th>
                    </tr>
                    </thead>
                </template>
            </v-data-table>
        </v-col>
        </v-row>
    </v-card>
</template>
<script>
  export default {
    name: 'playerEnemies',
    props: {
      items: Object,
      headers: Array
    },
    data: () => ({
      search: '',
      slots: ['header'],
    })
  }
</script>
