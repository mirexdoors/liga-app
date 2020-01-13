<template>
    <div>
        <v-dialog width="500">
            <template v-slot:activator="{ on }">
                <v-icon v-on="on">unarchive</v-icon>
            </template>

            <v-card>
                <v-card-title class="headline grey" primary-title>Архив Лиги</v-card-title>
                <v-list>
                    <v-list-item>
                        <a target="_blank" href="http://league.sibsquash.ru/autumn-2019/">Осень 2019</a>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
  export default {
    name: "archive",
    data: () => ({}),
  }
</script>
<style scoped>

</style>