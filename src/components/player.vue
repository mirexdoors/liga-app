<template>
    <v-container fill-height fluid>
        <v-row justify="center">
        <v-layout column>
            <v-col
                    md="6">
            <v-card>
                <v-card-text>
                   <h1>{{player.name}}</h1>
                </v-card-text>
            </v-card>

                <v-list disabled>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item
                                v-for="item in items"
                        >
                            <v-list-item-content>
                                <v-list-item-title  v-text="item.text">{{item.value}}</v-list-item-title>
                            </v-list-item-content>
                            <v-chip
                                    class="ma-2"
                                    :style="getColor(player.division)"
                                    text-color="white"
                            >
                                {{item.value}}
                            </v-chip>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
</v-col>
        </v-layout>
        </v-row>
    </v-container>
</template>
<script>
    export default {
      name: 'player',
      data: () =>({}),
      computed: {
        player() {
          if (this.$store.state.detailPlayer) {
            return this.$store.state.detailPlayer[0];
          }
        },
        items() {
          if (this.$store.state.detailPlayer) {
            const player = this.$store.state.detailPlayer[0];
            return [
              {text: "Команда", value: player.team},
              {text: "Дивизион", value: player.division},
              {text: "Игры", value: player.games},
              {text: "Уникальные игры", value: player.unique_games},
              {text: "Очки", value: player.points}
            ]
          }
        }
      },
    }
</script>