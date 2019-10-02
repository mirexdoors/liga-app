<template>
    <v-row>
        <v-col sm="9" class="caption">
            <v-card class="orange--text pa-1 align-center" outlined tile>
                {{title}}
            </v-card>
            <v-row no-gutters v-for="item in items" v-bind:key="item.title">
                <v-col cols="8" sm="8">
                    <v-card class="pa-1" outlined tile>
                        {{item.title}}
                    </v-card>
                </v-col>
                <v-col cols="4" sm="4">
                    <v-card class="pa-1" outlined tile>
                        {{item.value}}
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
  export default {
    name: 'mainStatTable',
    props: {
      title: {
        type: Object,
        default: null
      },
      items: {
        type: Object,
        default: null
      }
    },
  }
</script>
<style scoped>

</style>