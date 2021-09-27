<template>
  <v-container class="pa-0" fill-height fluid>
    <v-layout column class="tableAllGames">
      <h1 class="title pa-2">Все матчи</h1>

      <v-card class="pa-2">
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
        />

        <v-data-table
          v-if="filteredGames.length"
          :headers="tableHeaders"
          :items="filteredGames"
          :items-per-page="20"
          :mobile-breakpoint="300"
          dark
        >
          <template v-slot:item="{item}">
            <tr>
              <td>
                <router-link
                  :to="translit(item.player_1)"
                  class="player__link d-inline-flex align-center"
                  :style="`color: ${item.player_1_color}`"
                >
                  {{ item.player_1 }}&nbsp;
                 ({{ item.player_1_team }})
                </router-link>
              </td>

              <td>
                <router-link
                  :to="translit(item.player_2)"
                  class="player__link d-inline-flex align-center"
                  :style="`color: ${item.player_2_color}`"
                >
                  {{ item.player_2 }}&nbsp;
                 ({{ item.player_2_team }})
                </router-link>
              </td>

              <td class="result">
                <result :item="item"/>
              </td>

              <td class="col-2">{{ item.date }}</td>

              <td
                  v-if="getAdmin"
                  class="col-1"
              >
                <v-btn
                    color="error"
                    text
                    small
                    @click="deleteResult(item)"
                >
                  X
                </v-btn>
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

export default {
  name: "allGames",
  components: {
    result
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "", value: "player_1", align: "left", sortable: false, },
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
  watch: {
    headers() {
      if (!this.getAdmin) {
        this.tableHeaders = this.headers.filter(header => {
          return header.value !== "delete";
        });
      } else this.tableHeaders = this.headers;
    }
  },
  computed: {
    getAdmin() {
      return this.$store.getters.getAdmin;
    },
    filteredGames(){
      if (!this.search) {
        console.log(this.$store.getters.getGames)
        return this.$store.getters.getGames;
      }

      const search = this.search.toLowerCase();

      return this.$store.getters.getGames.filter(game =>
          game.player_1.toLowerCase().indexOf(search) > -1 || game.player_2.toLowerCase().indexOf(search) > -1);
    }

  },
  methods: {
    deleteResult(item) {
      let games = this.getGames.filter(game => !(game.id === item.id));
      this.$store.commit("setGames", games);
      this.$store.dispatch("deleteGame", item);
    }
  },
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
