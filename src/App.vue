<template>
    <div>
        <v-app id="inspire">
            <preloader
                    color="accent-4"
                    v-if="!getLoadingState"
            >
            </preloader>
            <v-navigation-drawer
                v-model="drawer"
                mini-variant
                app
                clipped
            >
                <v-list dense>
                    <v-list-item>
                        <v-list-item-action>
                            <authorization
                                    v-on:errorAuth="getError"
                            />
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <router-link class="header__link" :to="'/all'">
                            <v-icon>list</v-icon>
                        </router-link>
                    </v-list-item>
                    <v-list-item>
                        <router-link
                            :to="'/stat'"
                            class="header__link">
                            <v-icon>insert_chart_outlined</v-icon>
                        </router-link>
                    </v-list-item>
                    <v-list-item>
                        <archive />
                            <!--<v-icon>archive</v-icon>-->
                    </v-list-item>
                    <v-list-item v-if="getAdmin">
                        <addMatch v-on:errorAuth="getError"/>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar app clipped-left>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-toolbar-title>
                    <router-link class="header__link" :to="'/'">Сквош Лига Осень-2022
                    </router-link>
                </v-toolbar-title>
                <div class="flex-grow-1" />
            </v-app-bar>

            <v-main v-if="getLoadingState">
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <keep-alive>
                            <router-view :key="$route.fullPath"/>
                        </keep-alive>
                    </v-layout>
                </v-container>
            </v-main>
        </v-app>
        <v-snackbar v-model="isError">
            <span style="color: red">{{ textError }}</span>
            <v-btn color="pink" text @click="isError = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
  import authorization from "./components/authorization/authorization";
  import addMatch from "./components/addMatch";
  import preloader from "./components/preloader.vue";
  import {API_URL} from "./mixins/mixins";
  import archive from "./components/archive.vue";

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
      if (this.$vuetify) {
        this.$vuetify.theme.dark = true;
      }
    },
    mounted() {
      if (sessionStorage.getItem("isAuth")) {
        this.isLoggedIn = true;
        this.$store.commit("setAdmin", true);
      }

      let apiPlayerUrl = API_URL + "/get/players/";
      if (this.$route.query['test'] === '1') {
         apiPlayerUrl += "?test=1";
      }

      if (this.$store) {
        this.$store.dispatch("fetchPlayers", apiPlayerUrl);
      }

    },
    computed: {
      getLoadingState() {
        return !!(this.$store && this.$store.state.players);
      },
      getAdmin() {
        return this.$store.getters.getAdmin;
      }
    },
    methods: {
      getError(e) {
        this.textError = e;
        this.isError = true;
      },
    },
    components: {
      archive,
      authorization,
      addMatch,
      preloader,
    }
  };
</script>
<style>
    .v-application .player__link {
        color: #fff;
        text-decoration-line: none;
        height: 100%;
    }

    .header__link {
        color: #fff !important;
        text-decoration-line: none;
    }
</style>
