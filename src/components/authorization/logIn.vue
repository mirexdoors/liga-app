<template>
  <v-card>
    <v-card-title class="headline grey" primary-title>Авторизация</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="login" placeholder="Введите логин" label="login" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              placeholder="Введите пароль"
              label="Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn @click="controlsDialog">Отмена</v-btn>
      <v-btn @click="getLogin">Ок</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  import {API_URL} from "../../mixins/mixins";

  export default {
  data: () => ({
    login: "",
    password: ""
  }),
  methods: {
    getLogin() {
      const data = {
        login: encodeURIComponent(this.login),
        password: encodeURIComponent(this.password)
      };
      const loginUrl = `${API_URL}/get/login/?login=${data.login}&password=${data.password}`;
      fetch(loginUrl, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          this.controlsDialog();
          if (responseJSON.isAuth) {
            this.login = "";
            this.password = "";
            sessionStorage.setItem("isAuth", responseJSON.isAuth);
            this.$store.commit("setAdmin", true);
          } else {
            this.$emit("errorAuth", "Неправильный логин или пароль");
          }
        })
        .catch(() => {
          this.controlsDialog();
          sessionStorage.setItem("isAuth", false);
          this.$emit("errorAuth", "Ошибка авторизации");
        });
    },
    controlsDialog() {
      this.$emit("controlsDialog");
    }
  }
};
</script>
