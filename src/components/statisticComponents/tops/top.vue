<template>
    <v-row no-gutters class="pa-2">
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9" class="caption">
                    <v-card
                            class="orange--text pa-1"
                            outlined
                            tile
                    >
                        Уникальные матчи
                    </v-card>
                    <v-row no-gutters v-for="uniqItem in uniqGames" v-bind:key="uniqItem.title">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                hhh
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                asdf
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9" class="caption">
                    <v-card
                            class="orange--text pa-1 align-center"
                            outlined
                            tile
                    >
                        Все матчи
                    </v-card>
                    <v-row no-gutters v-for="allGamesItem in allGames" v-bind:key="allGamesItem.title">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                asdddd
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                               asdda
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="4">
            <v-row>
                <v-col sm="9" class="caption">
                    <v-card
                            class="orange--text pa-1 align-center"
                            outlined
                            tile
                    >
                        Время лиги
                    </v-card>
                    <v-row no-gutters v-for="timeItem in ligueTime" v-bind:key="timeItem.title">
                        <v-col
                                cols="8"
                                sm="8"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                aaaa
                            </v-card>
                        </v-col>
                        <v-col
                                cols="4"
                                sm="4"
                        >
                            <v-card
                                    class="pa-1"
                                    outlined
                                    tile
                            >
                                dddd
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>

</script>
<style scoped>

</style>