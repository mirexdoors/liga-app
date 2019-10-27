<template>
  <div>
    <span v-if="!getAdmin">{{getScore}}</span>
    <v-select v-else :items="permissibleScore" ref="val" v-model="getScore" label="Результат"></v-select>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      permissibleScore: ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"]
    };
  },
  computed: {
    getAdmin() {
      return this.$store.getters.getAdmin;
    },
    getScore: {
      get() {
        return this.item.score;
      },
      set(value) {
        const newSocre = value.split("-")
        const data = {
          action: "edit",
          id: this.item.id,
          score_1: newSocre[0],
          score_2: newSocre[1],
          method: 'POST',
        }
        const apiEditMatchScore = "http://mirexda2.beget.tech/post/edit/";
        fetch(apiEditMatchScore, data)
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log(response)
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>