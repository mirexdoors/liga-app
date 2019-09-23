<template>
  <div>
    <v-dialog v-model="dialogMatch" width="500">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">add</v-icon>
        <v-icon v-on="on">sports_tennis</v-icon>
      </template>

      <v-card>
        <v-card-title class="headline grey" primary-title>Итоги матча</v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <h3 class="mx-auto">Выберите игроков</h3>
            </v-row>
            <v-row>
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
              <v-col cols="12" md="12">
                <v-select
                  :items="permissibleScore"
                  v-model="score"
                  label="Результат"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="score">
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
          <v-card-text class="headline mb-1">
              {{getPlayerNameById(player1)}} - {{getPlayerNameById(player2)}}
              <v-chip
                      class="ma-2 headline mb-1"
              >
                  {{this.score}}
              </v-chip>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red darken-1" @click="dialogConfirm = false">Отмена</v-btn>
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
      player1: "",
      player2: "",
      score: "",
      permissibleScore: ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"]
    };
  },
  computed: {
    playersOne() {
      return this.getPlayerNames();
    },
    playersTwo() {
      return this.getPlayerNames();
    },
  },
  methods: {
    getPlayerNameById(id) {
      const players = this.getPlayerNames();
      const player = players.filter(item => {
        if (item.id === id) return true;
      })[0];
      if (player)
        return player.name;
    },
    getPlayerNames() {
      const teamsFromStore = this.$store.getters.players;
      let players = [];
      for (let teamName in teamsFromStore){
        players = players.concat(teamsFromStore[teamName].players);
      }
      return players;
    },
    getConfirm() {
      this.dialogMatch = false;
      this.dialogConfirm = true;
    },
    saveResults() {
      this.dialogConfirm = false;
      if (this.player1 === this.player2) {
        this.$emit("errorAuth", "Игроки должны различаться");
        return;
      }
      const request = {
        url: "http://mirexda2.beget.tech/post/match/",
        data: {
          action: "add",
          player_1: this.player1,
          player_2: this.player2,
          score_1: this.score[0],
          score_2: this.score[2],
        }
      };

      this.$store.dispatch("addMatchReuslt", request)
        .then(() => {
          this.player1 = "";
          this.player2 = "";
          this.score = "";
        })
        .catch(error => {
          this.$emit("errorAuth", error);
        });
    }
  }
};
</script> 
