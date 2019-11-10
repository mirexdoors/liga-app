<template>
    <div>
        <span v-if="!getAdmin">{{getScore}}</span>
        <v-select v-else :items="permissibleScore" ref="val" v-model="getScore"
                  label="Результат"></v-select>
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
                    const newScore = value.split("-");
                    const data = {
                        action: "edit",
                        id: this.item.id,
                        date: this.item.date,
                        score_1: newScore[0],
                        score_2: newScore[1],
                    };
                    const formData = new FormData();
                    for (const propName in data) {
                        formData.append(propName, data[propName]);
                    }
                    const apiEditMatchScore = "http://league.sibsquash.ru/post/edit/";
                    fetch(apiEditMatchScore, {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => {
                            return response.json();
                        })
                        .catch(error => console.log(error));
                }
            }
        }
    };
</script>