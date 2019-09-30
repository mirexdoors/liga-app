<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9" class="caption">
                    <v-card
                            class="orange--text pa-1"
                            outlined
                            tile
                    >
                        Уникальные матчи
                    </v-card>
                    <v-row no-gutters v-for="uniqItem in uniqGames">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                {{uniqItem.title}}
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                {{uniqItem.value}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9"  class="caption">
                    <v-card
                            class="orange--text pa-1 align-center"
                            outlined
                            tile
                    >
                        Все матчи
                    </v-card>
                    <v-row no-gutters v-for="allGamesItem in allGames">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                {{allGamesItem.title}}
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-2"
                                    outlined
                                    tile
                            >
                                {{allGamesItem.value}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9"  class="caption">
                    <v-card
                            class="orange--text pa-1 align-center"
                            outlined
                            tile
                    >
                        Время лиги
                    </v-card>
                    <v-row no-gutters v-for="timeItem in ligueTime">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-2"
                                    outlined
                                    tile
                            >
                                {{timeItem.title}}
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-2"
                                    outlined
                                    tile
                            >
                                {{timeItem.value}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: "main-stat",
    data: () => ({
      uniqGames: {
        gamesPlayed:{title: 'Сыграно матчей', value: null},
        gamesLeft: {title: 'Осталось матчей', value: null},
        percentOfMax: {title: '% от максимума', value: null},
      },
      allGames: {
        gamesPlayed:{title: 'Сыграно матчей', value: null},
        gamesLeft: {title: 'Осталось матчей', value: null},
        percentOfMax: {title: '% от максимума', value: null},
      },
      ligueTime: {
        daysPassed: {title: 'Прошло дней', value: null},
        daysLeft: {title: 'Осталось дней', value: null},
        percentOfAllTime: {title: '% от времени', value: null},
      }

    }),
    mounted() {
      this.ligueTime.daysPassed.value = getDaysPassed();
      this.ligueTime.daysLeft.value = getDaysLeft();
      this.ligueTime.percentOfAllTime.value = ((this.ligueTime.daysPassed.value / (this.ligueTime.daysLeft.value + this.ligueTime.daysPassed.value)) * 100).toFixed(1) + '%';
    },
    computed: {
      teams() {
        return this.$store.getters.players;
      }
    },
  }
  const getDaysPassed = () => {
    const d0 = new Date('September 01, 2019 00:00:00');
    const d1 = new Date();
    return Math.round((d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24) + 1);
  };
  const getDaysLeft = () => {
    const d0 = new Date('December 13, 2019');
    const d1 = new Date();
    return Math.round((d0.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }


</script>

<style scoped>

</style>