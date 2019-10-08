<template>
    <v-card class="ma-1" outlined tile>
    {{items}}
    </v-card>
</template>
<script>
  export default {
    name: 'playerEnemies',
    props: {
      items: Object
    },
    data: () => ({})
  }
</script>
