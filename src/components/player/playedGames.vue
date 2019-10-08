<template>
    <div>
        <v-text-field v-model="search" append-icon="search" label="Поиск" single-line
                      hide-details></v-text-field>

        <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :items-per-page="10"
                dark
        >
            <template v-slot:item.player_1="{ item }">

                <router-link :class="changePlayerFont(item.player_1)"
                           class="player__link d-inline-flex align-center" :to="translit(item.player_1)">
                    {{item.player_1}}
              </router-link>
           </template>
            <template v-slot:item.player_2="{ item }">
                <router-link :class="changePlayerFont(item.player_2)"
                             class="player__link d-inline-flex align-center" :to="translit(item.player_2)">
                   {{item.player_2}}
               </router-link>
            </template>
            <template v-slot:item.score="{ item }">
               <div class="flex-column d-flex pa-md-2 align-self-center">
                    <v-chip label outlined class="d-flex justify-center">{{item.score}}</v-chip>
                    <div class="player__points font-italic d-flex justify-center">{{item.points}}</div>
               </div>
            </template>
        </v-data-table>
    </div>
</template>
<script>
  export default {
    name: 'playedGames',
    props: {
      headers: Array,
      items: Array,
      player: Object
    },
    data:() => ({
      search: '',
      slots: [
        'body',
      ]
    }),
    methods: {
      changePlayerFont(playerName) {
        if (playerName == this.player.name) {
          return 'font-weight-bold orange--text darken-2';
        }
      },
    },
  }
</script>
<style scoped>
    .player__points {
        font-size: 12px;
    }
</style>