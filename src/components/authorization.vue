<template>
    <v-dialog v-model="isAuthDialog" width="500">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on">settings</v-icon>
        </template>

        <v-card>
            <v-card-title class="headline grey" primary-title>Авторизация</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="login" placeholder="Введите логин" label="login"
                                          required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password" placeholder="Введите пароль" label="Password*"
                                          type="password" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="isAuthDialog = false">Отмена</v-btn>
                <v-btn @click="getLogin">Ок</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>

  export default {
    data: () => ({
      isAuthDialog: false,
      valid: false,
      login: "",
      password: "",
    }),
    methods: {
      getLogin() {
        const STAGE_API = "http://mirexda2.beget.tech";
        const data = {
          login: encodeURIComponent(this.login),
          password: encodeURIComponent(this.password),
        };
        const loginUrl = `${STAGE_API}/get/login/?login=${data.login}&password=${data.password}`;
        fetch(loginUrl, {
          method: "GET",
        })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          this.isAuthDialog = false;
          if (responseJSON.isAuth) {
            this.login = "";
            this.password = "";
            sessionStorage.setItem('isAuth', responseJSON.isAuth);
          } else {
            this.$emit("errorAuth", "Неправильный логин или пароль");
          }

        })
        .catch(() => {
          this.isAuthDialog = false;
          sessionStorage.setItem('isAuth', false);
          this.$emit("errorAuth", "Ошибка авторизации");
        });
      }
    }
  };
</script>