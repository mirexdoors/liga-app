<template>
    <v-card>
        <v-card-title>
            {{currentDate}}
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search" append-icon="search" label="Поиск"
                          single-line hide-details></v-text-field>
        </v-card-title>

        <v-row no-gutters>
            <v-col v-for="team in teams" v-bind:key="team.title" cols="12"
                   sm="4">
                <v-card class="ma-1" outlined tile>
                    <v-data-table
                            :headers="headers"
                            :items="team.players"
                            :search="search"
                            :items-per-page="30"
                            hide-default-footer
                            fixed-header
                    >
                        <template v-slot:header="{ props: { headers }  }">
                            <thead>
                            <tr>
                                <th :colspan="headers.length-2">
                                    <v-chip color="orange" label outlined>
                                        {{team.title}}
                                    </v-chip>
                                </th>
                                <th colspan="2" v-if="getAdmin">
                                    <v-chip color="orange" label outlined>
                                        {{team.total.toFixed(1)}}
                                        <v-icon right>star</v-icon>
                                    </v-chip>
                                </th>
                            </tr>
                            </thead>
                        </template>
                        <template v-slot:body.prepend="{headers}">
                            <tr class="d-sm-none">
                                <th
                                        :class="getClassForCol(header.value)"
                                        v-for="header in headers"
                                        v-bind:key="header.text"
                                >{{header.text}}
                                </th>
                            </tr>
                        </template>
                        <template v-slot:item="{item}">
                            <tr :style="getColor(item)">
                                <td :class="getClassForCol('name')">
                                    <router-link class="player__link"
                                                 :to="translit(item.name)">
                                        {{item.name}}
                                    </router-link>
                                </td>
                                <td :class="getClassForCol('games')">
                                    <router-link class="player__link"
                                                 :to="translit(item.name)">
                                        {{item.games
                                        ? item.games : 0 }}
                                    </router-link>
                                </td>
                                <td :class="getClassForCol('games')">
                                    <router-link class="player__link"
                                                 :to="translit(item.name)">
                                        {{item.unique_games ?
                                        item.unique_games : 0}}
                                    </router-link>
                                </td>
                                <td :class="getClassForCol('points')">
                                    <router-link class="player__link"
                                                 :to="translit(item.name)">
                                            <span
                                                    v-if="getAdmin">{{item.points ?
                                                item.points : 0}}</span>
                                        <span v-else>&#10067;</span>
                                    </router-link>
                                </td>
                                <td :class="getClassForCol('penalty')">
                                    <router-link class="player__link"
                                                 :to="translit(item.name)">
                                            <span
                                                    v-if="getAdmin">{{item.penalty && item.points>0 ?
                                                item.penalty : 0}}</span>
                                        <span v-else>&#10067;</span>
                                    </router-link>
                                </td>
                            </tr>
                        </template>
                        <template v-slot:body.append>
                            <tr class="orange--text table__footer">
                                <td class="font-weight-bold"
                                    :class="getClassForCol('name')">Итого
                                </td>
                                <td :class="getClassForCol('games')">
                                    {{team.total_games}}
                                </td>
                                <td :class="getClassForCol('games')">
                                    {{team.total_unique_games}}
                                </td>
                                <td :class="getClassForCol('points')"><span v-if="getAdmin"
                                                                            class="orange--text font-weight-bold">{{team.total.toFixed(1)}}</span>
                                    <span v-else>&#10067;</span>
                                </td>
                                <td :class="getClassForCol('penalty')"><span v-if="getAdmin"
                                                                             class="red--text font-weight-bold">{{team
                                    .total_penalty}}</span>
                                    <span v-else>&#10067;</span>
                                </td>
                            </tr>
                            <tr v-if="getAdmin">
                                <td>Итого с учётом штрафа:</td>
                                <td></td>
                                <td></td>
                                <td class="font-weight-bold deep-orange--text">{{(team
                                    .total.toFixed(1) - team
                                    .total_penalty).toFixed(1)}}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

    </v-card>
</template>
<script>
    export default {
        name: "ligue",
        props: {},
        data() {
            return {
                currentDate: new Date().toLocaleString("ru", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                    timezone: "UTC"
                }),
                search: "",
                slots: ["header", "body.append", "body.prepend"],
                headers: [
                    {
                        text: "Игрок",
                        align: "left",
                        sortable: false,
                        value: "name",
                    },
                    {text: "Матчи", value: "games", class: "pa-1"},
                    {text: "Уник.", value: "unique_games"},
                    {text: "Очки", value: "points"},
                    {text: "Штраф", value: "penalty"}
                ]
            };
        },
        methods: {
            getClassForCol: value => {
                switch (value) {
                    case "name":
                        return "player__name";
                    case "games":
                        return "player__games pa-1";
                    case "unique_games":
                        return "player__games pa-1";
                    case "points":
                        return "player__points pa-1";
                    case "penalty":
                        return "player__points pa-1";
                }
            }
        },
        computed: {
            teams() {
                if (this.$store) {
                    return this.$store.getters.players;
                } else {
                    return false;
                }
            },
            getAdmin() {
                return this.$store.getters.getAdmin;
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.path !== '/all') {
                const playerName = to.params.playername;
                /*find player in vuex*/
                let detailPlayer = null;
                this.$store.dispatch("setDetailPlayer", null);
                for (const team in this.teams) {

                    detailPlayer = this.teams[team].players.filter(item => {
                        if (this.translit(item.name) === playerName) return item;
                    })[0];
                    if (detailPlayer) {
                        this.$store.dispatch("fetchDetailGames", detailPlayer.id);
                        this.$store.dispatch("setDetailPlayer", detailPlayer);
                        break;
                    }
                }
            }
            next();
        }
    };
</script>

<style scoped>
    .player__name, .player__link {
        text-align: left;
    }

    .player__games,
    .player__points {
        text-align: center;
    }

    .table__footer .player__games, .table__footer .player__points {
        text-align: left;
    }

    .player__link {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .player__games .player__link, .player__points .player__link {
        text-align: center;
    }

    @media all and (max-width: 340px) {
        .player__link {
            font-size: 11px;
        }
    }
</style>
