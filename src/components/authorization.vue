<template>
  <v-dialog v-model="isAuthDoalog" width="500">
    <template v-slot:activator="{ on }">
      <v-icon   v-on="on">settings</v-icon>
    </template>

    <v-card>
      <v-card-title class="headline grey" primary-title>Авторизация</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="login" label="login" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn @click="isAuthDoalog = false">Отмена</v-btn>
        <v-btn @click="getLogin">Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<script>

export default {
  data: () => ({
    isAuthDoalog: false,
    valid: false,
    login: "",
    password: ""
  }),
  methods: {
    getLogin() {
      const data = {
        login: this.login,
        password: this.password
      };
      fetch("https://github.com/mirexdoors/liga-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
            this.isAuthDoalog = false;
            if (response.isAuth){
                this.login = "";
                this.password = "";
                sessionStorage.setItem('isAuth', response.isAuth);
            } else {
                this.$emit("errorAuth", "Неправильный логин или пароль");
            }
          
        })
        .catch(() => {
          this.isAuthDoalog = false;
          sessionStorage.setItem('isAuth', false);
          this.$emit("errorAuth", "Ошибка авторизации");
        });
    }
  }
};
</script>