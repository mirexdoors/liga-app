<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">dashboard</v-icon>
    </template>

    <v-card>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select :items="teamsOne" v-model="team1" label="Команда1"></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select :items="teamsTwo" v-model="team2" label="Команда2"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                :items="playersOne"
                item-text="name"
                item-value="id"
                v-model="player1"
                label="Игрок1"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="playersTwo"
                item-text="name"
                item-value="id"
                v-model="player2"
                label="Игрок2"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <h3 class="mx-auto">Счет</h3>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select :items="validScore" v-model="score1" label="Результат"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select :items="validScore" v-model="score2" label="Результат"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <div class="text-center">
                <v-btn>Отправить</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      team1: "",
      team2: "",
      player1: "",
      player2: "",
      score1: "",
      score2: "",
      validScore: ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"]
    };
  },
  computed: {
    teamsOne() {
      return this.getTeamNames(this.team2);
    },
    teamsTwo() {
      return this.getTeamNames(this.team1);
    },
    playersOne() {
      return this.getPlayerNames(this.team2);
    },
    playersTwo() {
      return this.getPlayerNames(this.team1);
    }
  },
  methods: {
    getTeamNames(forbiddenTeam) {
      const teamsFromStore = this.$store.getters.players;
      let teams = [];
      if (teamsFromStore) {
        for (let team in teamsFromStore) {
          if (team !== forbiddenTeam) {
            teams.push(team);
          }
        }
      }
      return teams;
    },
    getPlayerNames(teamName) {
      const teamsFromStore = this.$store.getters.players;
      let players = [];
      if (teamsFromStore) {
        for (let team in teamsFromStore) {
          if (team !== teamName) {
            players = players.concat(teamsFromStore[team].players);
          }
        }
      }
      return players;
    }
  }
};
</script>