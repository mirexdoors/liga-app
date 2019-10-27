<template>
  <div>
    <v-menu v-if="getAdmin" v-model="menu" :close-on-content-click="false" max-width="290">
      <template v-slot:activator="{ on }">
        <v-text-field :value="getDate" v-on="on"></v-text-field>
      </template>
      <v-date-picker @change="getDate = $event"></v-date-picker>
    </v-menu>
    <span v-else>{{ item.date }}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["item"],
  data: () => ({
    menu: false
  }),
  computed: {
    getAdmin() {
      return this.$store.getters.getAdmin;
    },
    getDate: {
      get() {
        const date = this.item.date.split("-");
        const formatDate = new Date(`${date[1]}.${date[0]}.${date[2]}`);
        return formatDate ? moment(formatDate).format("DD-MM-YYYY") : "";
      },
      set(value) {
        console.log(value);
        this.menu = false;
        const date = value.split("-");
        const formatDateForDatePicker = new Date(
          `${date[1]}.${date[2]}.${date[0]}`
        );

        const data = {
          action: "edit",
          id: this.item.id,
          date: `${date[2]}.${date[1]}.${date[0]}`,
          method: "POST"
        };
        const apiEditMatchScore = "http://mirexda2.beget.tech/post/edit/";
        fetch(apiEditMatchScore, data)
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log(response);
            return date
              ? (this.item.date = moment(formatDateForDatePicker).format(
                  "DD-MM-YYYY"
                ))
              : (this.item.date = "");
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style>
</style>