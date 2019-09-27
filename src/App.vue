<template>
    <div>
        <v-app id="inspire">
            <preloader
                    color="accent-4"
                    v-if="!getLoadingState"
            >
            </preloader>
            <v-navigation-drawer v-model="drawer" mini-variant app clipped>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-action>
                            <authorization
                                    v-on:errorAuth="getError"
                                    v-on:signIn="signIn"
                                    v-on:logOut="logOut"
                                    :isLoggedIn="isLoggedIn"
                            />
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <router-link class="header__link" :to="'/all'"><v-icon>list</v-icon></router-link>
                    </v-list-item>
                    <v-list-item>
                        <router-link class="header__link" :to="'/stat'">
                            <v-icon>insert_chart_outlined</v-icon>
                        </router-link>
                    </v-list-item>
                    <v-list-item v-if="isLoggedIn">
                        <addMatch v-on:errorAuth="getError"/>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar app clipped-left>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link class="header__link" :to="'/'">Сквош Лига 2019
                    </router-link>
                </v-toolbar-title>
                <div class="flex-grow-1"></div>
            </v-app-bar>

            <v-content
            v-if="getLoadingState">
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </v-layout>
                </v-container>
            </v-content>

            <v-footer app>
                <span>&copy; 2019 Новосибирская федерация Сквоша</span>
            </v-footer>
        </v-app>
        <v-snackbar v-model="isError">
            <span style="color: red">{{ textError }}</span>
            <v-btn color="pink" text @click="isError = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
  import authorization from "./components/authorization";
  import addMatch from "./components/addMatch";
  import preloader from "./components/preloader.vue";

  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      isError: false,
      textError: "Ошибка авторизации",
      isLoggedIn: false,
      isLoaded: true
    }),
    created() {
      this.$vuetify.theme.dark = true;
    },
    mounted() {
      if (sessionStorage.getItem("isAuth")) this.isLoggedIn = true;
      const apiPlayerUrl = "http://mirexda2.beget.tech/get/players/";
      this.$store.dispatch("fetchPlayers", apiPlayerUrl);
    },
    computed: {
      getLoadingState () {
        if (this.$store.state.players) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      getError(e) {
        this.textError = e;
        this.isError = true;
      },
      signIn() {
        this.isLoggedIn = true;
      },
      logOut() {
        this.isLoggedIn = false;
      }
    },
    components: {
      authorization,
      addMatch,
      preloader,
    }
  };
</script>
<style>
    .header__link {
        color: #fff !important;
        text-decoration-line: none;
    }
</style>