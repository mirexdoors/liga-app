<template>
    <v-card>
        <v-card-title>
            {{currentDate}}
            <div class="flex-grow-1"></div>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-container fluid>
            <v-row>
                <div v-for="team in teams" v-bind:key="team.title">
                    <v-card
                            class="ma-4 pa-1"
                            outlined
                            tile
                    >
                        <v-data-table
                                :headers="headers"
                                :items="team.players"
                                :search="search"
                                hide-default-footer
                                dark
                        ></v-data-table>
                    </v-card>
                </div>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
  export default {
    name: 'ligue',
    props: {},
    data() {
      return {
        currentDate: new Date().toLocaleString("ru", {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          timezone: 'UTC',
        }),
        search: '',
        headers: [
          {
            text: 'Команда',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          {text: 'Уник.матч', value: 'games'},
          {text: 'Все матчи', value: 'team'},
          {text: 'Очки', value: 'points'},
        ],
      }
    },
    computed: {
      teams() {
        return this.$store.getters.players;
      }
    },
  }
</script>