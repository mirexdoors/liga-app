<template>
  <div>
    <span v-if="!getAdmin">{{item.score}}</span>
    <v-select v-else :items="permissibleScore" v-model="score" label="Результат" @change="changeScore"></v-select>
  </div>
</template>

<script>
export default {
  props: ["item", "index"],
  data() {
    return {
      score: this.item.score,
      permissibleScore: ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"]
    };
  },
  methods: {
    changeScore() {
      if (this.item.score !== this.score){
        // 
      }
    }
  },
  computed: {
    getAdmin() {
      return this.$store.getters.getAdmin;
    },
  }
};
</script>