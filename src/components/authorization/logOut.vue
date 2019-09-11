<template>
  <v-card>
    <v-card-title class="headline grey" primary-title>Авторизация</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h3>Вы уверены что хотите выйти?</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn @click="controlsDialog">Отмена</v-btn>
      <v-btn @click="getLogOut">Выйти</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    controlsDialog() {
      this.$emit("controlsDialog");
    },
    getLogOut() {
      this.controlsDialog();
      sessionStorage.removeItem("isAuth");
      this.$emit("logOut");
    }
  }
};
</script>
