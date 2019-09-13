<template>
    <div>
        <v-app id="inspire">
            <v-navigation-drawer v-model="drawer" app clipped>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-action>
                            <authorization v-on:errorAuth="getError" v-on:signIn="signIn" v-on:logOut="logOut" :isLoggedIn="isLoggedIn"/>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>

            </v-navigation-drawer>
            <v-app-bar app clipped-left>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Сквош Лига 2019</v-toolbar-title>
                <div class="flex-grow-1"></div>
            </v-app-bar>

            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <ligue></ligue>
                    </v-layout>
                </v-container>
            </v-content>

            <v-footer app>
                <span>&copy; 2019</span>
            </v-footer>
        </v-app>
        <v-snackbar
                v-model="isError"
        >
            <span style="color: red">{{ textError }}</span>
            <v-btn
                    color="pink"
                    text
                    @click="isError = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>

  import authorization from "./components/authorization"
  import Ligue from "./components/ligue";

  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      isError: false,
      textError: 'Ошибка авторизации',
      isLoggedIn: false,
    }),
    created() {
      this.$vuetify.theme.dark = true;
    },
    mounted() {
      if (sessionStorage.getItem('isAuth')) this.isLoggedIn = true;
      const apiPlayerUrl = "http://mirexda2.beget.tech/get/players/";
      this.$store.dispatch('fetchPlayers', apiPlayerUrl);
    },
    methods: {
      getError(e) {
        this.textError = e;
        this.isError = true;
      },
      signIn(){
        this.isLoggedIn = true;
      },
      logOut(){
        this.isLoggedIn = false;
      }
    },
    components: {
      Ligue,
      authorization
    }
  };
</script>

