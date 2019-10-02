<template>
    <v-col cols="12" sm="4">
        <v-row>
            <v-col sm="9" class="caption">
                <v-card class="orange--text pa-1" outlined tile>
                    {{title}}
                </v-card>
                <v-row no-gutters v-for="item in items" :key="item.name">
                    <v-col cols="8" sm="8">
                        <v-card class="pa-1" outlined tile>
                            {{item}}
                        </v-card>
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-card class="pa-1" outlined tile>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
  export default {
    name: 'topTable',
    props: {
      title: {
        type: String,
        default: null
      },
      items: {
        type: Array,
        default: function () { return [] }
      },
    },
  }
</script>
