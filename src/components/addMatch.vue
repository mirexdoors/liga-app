<template>
  <div>
    <v-dialog v-model="dialogMatch" width="500">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">dashboard</v-icon>
      </template>

      <v-card>
        <v-card-title class="headline grey" primary-title>Итоги матча</v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <h3 class="mx-auto">Выберите команду</h3>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-select :items="teamsOne" v-model="team1" label="Команда1"></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select :items="teamsTwo" v-model="team2" label="Команда2"></v-select>
              </v-col>
            </v-row>
            <v-row v-if="team1 && team2">
              <h3 class="mx-auto">Выберите игроков</h3>
            </v-row>
            <v-row  v-if="team1 && team2">
              <v-col cols="12" md="6">
                <v-autocomplete
                        label="Введите игрока"
                        :items="playersOne"
                        item-text="name"
                        item-value="id"
                        v-model="player1"
                        filled
                        rounded
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                        label="Введите игрока"
                        :items="playersTwo"
                        item-text="name"
                        item-value="id"
                        v-model="player2"
                        filled
                        rounded
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row v-if="player1 && player2">
              <h3 class="mx-auto">Счет</h3>
            </v-row>
            <v-row v-if="player1 && player2">
              <v-col cols="12" md="6">
                <v-select
                  :items="permissibleScore"
                  v-model="score1"
                  @change="setScore2"
                  label="Результат"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="permissibleScore"
                  v-model="score2"
                  @change="setScore1"
                  label="Результат"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="score1 && score2">
              <v-col cols="12" md="12">
                <div class="text-center">
                  <v-btn @click="getConfirm">Отправить</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" width="500">
      <v-card>
        <v-container>
          <v-card-text>Сохранить результат?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" @click="dialogConfirm = false">Отмена</v-btn>
            <v-btn color="green darken-1" @click="saveResults">Сохранить</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogMatch: false,
      dialogConfirm: false,
      team1: "",
      team2: "",
      player1: "",
      player2: "",
      score1: "",
      score2: "",
      permissibleScore: ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"]
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
    setScore1(e) {
      let index = this.permissibleScore.indexOf(e) + 1;
      this.score1 = this.permissibleScore[this.permissibleScore.length - index];
    },
    setScore2(e) {
      let index = this.permissibleScore.indexOf(e) + 1;
      this.score2 = this.permissibleScore[this.permissibleScore.length - index];
    },
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
    },
    getConfirm() {
      this.dialogMatch = false;
      this.dialogConfirm = true;
    },
    saveResults() {
      this.dialogConfirm = false;
      const request = {
        url: "http://mirexda2.beget.tech/post/match/",
        data: {
          action: "add",
          player_1: this.player1,
          player_2: this.player2,
          score_1: this.score1,
          score_2: this.score2
        }
      };

      this.$store.dispatch("addMatchReuslt", request)
        .then(result => {
          this.$emit("errorAuth", result);
        })
        .catch(error => {
          this.$emit("errorAuth", error);
        });
    }
  }
};
</script> 
