<template>
  <v-card>
    <v-card-title>
      {{currentDate}}
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
    </v-card-title>
    <v-container>
      <v-row no-gutters>
       
        <v-col v-for="team in teams" v-bind:key="team.title"  cols="12"
        sm="4">
          <v-card class="ma-1" outlined tile>
            <v-data-table
             class="elevation-1"
              :headers="headers"
              :items="team.players"
              :search="search"
              :items-per-page="25"
              :headers-length=5
              hide-default-footer
              dark
            >
              <template v-slot:item="{ item }">
                <tr :style=" getColor(item.division)">
                  <td class="player__name">{{ item.name }}</td>
                  <td class="player__games" >{{ item.unique_games }}</td>
                  <td class="player__games">{{ item.games }}</td>
                  <td class="player__points">{{ item.points }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "ligue",
  props: {},
  data() {
    return {
      currentDate: new Date().toLocaleString("ru", {
        month: "long",
        day: "numeric",
        weekday: "long",
        timezone: "UTC"
      }),
      search: "",
      headers: [
        {
          text: "Команда",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Уник.матч", value: "unique_games"},
        { text: "Матчи", value: "games" },
        { text: "Очки", value: "points"}
      ]
    };
  },
  methods: {
     getColor(division) {
      if (division == 1) return "backgroundColor: #842828";
      else if (division == 2) return "backgroundColor: #b79a2f";
      else return "backgroundColor: #55a74b";
    },
  },
  computed: {
    teams() {
      return this.$store.getters.players;
    }
  }
};
</script>

<style scoped>
.player__name {
  width: 34%;
}
.player__games {
  width: 16%;
}
.player__points {
  width: 20%;
}
</style>