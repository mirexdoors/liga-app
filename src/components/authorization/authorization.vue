<template>
    <v-dialog v-model="isAuthDialog" width="500">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="!isLoggedIn">person</v-icon>
            <v-icon v-on="on" v-else-if="isLoggedIn">person_outline</v-icon>
        </template>

        <logIn
                v-if="!isLoggedIn"
                v-on:controlsDialog="hidesDialog"
                v-on:signIn="signIn"
                v-on:errorAuth="displaysError"
        />
        <logOut
                v-else
                v-on:controlsDialog="hidesDialog"
                v-on:logOut="logOut"
        />
    </v-dialog>
</template>


<script>
  import logIn from "./logIn";
  import logOut from "./logOut";

  export default {
    props: ["isLoggedIn"],
    data: () => ({
      isAuthDialog: false,
      icon: 'mdi-tennis',
      color: 'warning',
    }),
    methods: {
      hidesDialog() {
        this.isAuthDialog = false;
      },

      signIn() {
        this.$emit("signIn");
      },
      displaysError(e) {
        this.$emit("errorAuth", e);
      },
      logOut() {
        this.$emit("logOut");
      }
    },
    components: {
      logIn,
      logOut
    }
  };
</script>