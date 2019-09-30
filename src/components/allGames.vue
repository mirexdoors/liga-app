<template>
    <v-container fill-height fluid>
        <v-layout column class="tableAllGames">

                <v-text-field v-model="search" append-icon="search" label="Поиск" single-line
                              hide-details></v-text-field>
                <v-data-table
                        v-if="games"
                        :headers="headers"
                        :items="games"
                        :search="search"
                        :items-per-page="20"
                        :mobile-breakpoint=300
                        dark
                ></v-data-table>

        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: "allGames",
    data() {
      return {
        search: '',
        headers: [
          {
            text: '',
            align: "left",
            sortable: false,
            value: "player_1"
          },
          {text: "", value: "player_2", align: "left", sortable: false},
          {text: "Счёт", value: "score", align: "left"},
          {text: "Дата", value: "date", align: "left"}
        ],
        games: [],
      }
    },
    created() {
      const apiMatchesUrl = "http://mirexda2.beget.tech/get/games/all/";
      fetch(apiMatchesUrl)
        .then(response => {
          return response.json();
        })
        .then(matchesJSON => {
          this.games = matchesJSON.games;
        });
    },
  }
</script>
<style>
    @media screen and (max-width: 448px){
        .tableAllGames .v-data-table td, .tableAllGames .v-data-table th {
            font-size: 10px;
            padding: 8px;
        }
    }

</style>