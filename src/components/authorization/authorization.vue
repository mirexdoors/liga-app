<template>
    <v-dialog v-model="isAuthDialog" width="500">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="!getAdmin">person</v-icon>
            <v-icon v-on="on" v-else-if="getAdmin">person_outline</v-icon>
        </template>

        <logIn
                v-if="!getAdmin"
                v-on:controlsDialog="hidesDialog"
                v-on:errorAuth="displaysError"
        />
        <logOut
                v-else
                v-on:controlsDialog="hidesDialog"
        />
    </v-dialog>
</template>


<script>
  import logIn from "./logIn";
  import logOut from "./logOut";

  export default {
    data: () => ({
      isAuthDialog: false,
      icon: 'mdi-tennis',
      color: 'warning',
    }),
    methods: {
      hidesDialog() {
        this.isAuthDialog = false;
      },
      displaysError(e) {
        this.$emit("errorAuth", e);
      },
    },
    computed: {
      getAdmin(){
        if (this.$store)
            return this.$store.getters.getAdmin;
      }
    },
    components: {
      logIn,
      logOut
    }
  };
</script>