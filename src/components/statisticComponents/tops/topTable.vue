<template>
    <v-col cols="12" sm="6">
        <v-row>
            <v-col sm="12" class="caption">
                <v-card class="orange--text pa-1" outlined tile>
                    {{title}}
                </v-card>
                <v-row no-gutters v-for="item in items" :key="item.name">
                    <v-col cols="4" sm="6">
                        <v-card class="pa-1" outlined tile>
                            <router-link class="player__link" :to="translit(item.name)">{{item.name}}
                            </router-link>
                        </v-card>
                    </v-col>
                    <v-col cols="4" sm="3">
                        <v-card class="pa-1 orange--text" height="100%" outlined tile>
                            {{item.team}}
                        </v-card>
                    </v-col>
                    <v-col cols="4" sm="3">
                        <v-card class="pa-1" height="100%" outlined tile>
                            {{item[param]}}
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
      param: {
        type: String,
        default: null,
      },
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
  }
</script>
