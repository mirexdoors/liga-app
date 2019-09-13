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
                <v-card
                        class="ma-4 pa-1"
                        outlined
                        tile
                >
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :search="search"
                            dark
                            hide-default-footer
                    ></v-data-table>

                </v-card>
                <v-card
                        class="ma-4 pa-1"
                        outlined
                        tile
                >
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :search="search"
                            hide-default-footer
                            dark
                    ></v-data-table>
                </v-card>
                <v-card
                        class="ma-4 pa-1"
                        outlined
                        tile
                >
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :search="search"
                            hide-default-footer
                            dark
                    ></v-data-table>
                </v-card>
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
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          {text: 'Calories', value: 'calories'},
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
        ],
      }
    },
    computed: {
      players() {
        const storePlayers = this.$store.getters.players;
        return storePlayers;
      }
    },
  }
</script>