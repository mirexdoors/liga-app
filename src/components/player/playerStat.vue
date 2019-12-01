<template>
    <v-list disabled>
        <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-content>
                    <v-list-item-title v-text="item.text">{{item.value}}</v-list-item-title>
                </v-list-item-content>
                {{item.value}}
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>
<script>
  export default {
    name: 'playerStat',
    props: {
      items: Object
    },
    data: () => ({}),
      computed: {
          getAdmin() {
              return this.$store.getters.getAdmin;
          }
      }
  }
</script>
