<template>
  <v-container class="pa-0" fill-height fluid>
    <v-layout column class="tableAllGames">
      <h1 class="title pa-2">Все матчи</h1>
      <v-card class="pa-2">
        <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
        <v-data-table
          v-if="getGames"
          :headers="tableHeaders"
          :items="getGames"
          :search="search"
          :items-per-page="20"
          :mobile-breakpoint="300"
          :page.sync="page"
          dark
        >
          <template v-slot:item="{item}">
            <tr>
              <td>
                <router-link
                  class="player__link d-inline-flex align-center"
                  :to="translit(item.player_1)"
                >{{item.player_1}}</router-link>
              </td>
              <td>
                <router-link
                  class="player__link d-inline-flex align-center"
                  :to="translit(item.player_2)"
                >{{item.player_2}}</router-link>
              </td>
              <td class="result">
                <result :item="item" />
              </td>
              <td class="result">
                <gameDate :item="item"/>
              </td>
              <td v-if="getAdmin">
                <v-btn color="error" text small @click="deleteResult(item)">X</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import result from "./result";
import gameDate from "./gameDate";


export default {
  name: "allGames",
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "player_1"
        },
        { text: "", value: "player_2", align: "left", sortable: false },
        { text: "Счёт", value: "score", align: "left" },
        { text: "Дата", value: "date", align: "left" },
        { text: "Удалить", value: "delete", align: "left" }
      ],
      isAdmin: false,
      tableHeaders: [],
      games: []
    };
  },
  created() {
    this.$store.dispatch("fetchGames");
  },
  computed: {
    getAdmin() {
      return this.$store.getters.getAdmin;
    },
    getGames(){
       if (!this.getAdmin) {
          this.tableHeaders = this.headers.filter(header => {
            return header.value !== "delete";
          });
        } else this.tableHeaders = this.headers;
      return this.$store.getters.getGames;
    }

  },
  methods: {
    deleteResult(item) {
      this.$store.dispatch("deleteGame", {
        action: "delete",
        id: Number(item.id),
        method: 'POST',
      })
        .then(() => {
          let games = this.getGames.filter(game => !(game.id === item.id));
          this.$store.commit("setGames", games);
        })
        .catch(error => console.log(error));
      
    }
  },
  components: {
    result,
    gameDate
  }
};
</script>
<style scoped>
.player__link {
  width: auto;
  height: 100%;
}

.result {
  width: 284px;
}

@media screen and (max-width: 448px) {
  .tableAllGames .v-data-table td,
  .tableAllGames .v-data-table th {
    font-size: 10px;
    padding: 8px;
  }
}
</style>