<template>
    <v-container>
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12>
                <v-text-field
                        label="Ajoute une tâche.."
                        v-on:keyup.enter="addOne"
                        v-model="taskText"
                        append-icon="add"
                        @click:append="addOne"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-card class="task" v-for="task in tasks">
                    <v-layout wrap align-center>
                        <v-flex xs12 md10>
                            <h1>{{task.title}}</h1>
                            <span>
                                <v-chip v-on:click="addorRemoveTag(task.id, 'important')" :color="task.important ? 'error' : ''">Important</v-chip>
                                <v-chip v-on:click="addorRemoveTag(task.id, 'later')" :color="task.later ? 'warning' : ''">Later</v-chip>
                            </span>
                        </v-flex>
                        <v-flex xs12 md2>
                            <v-layout class="taskActions" wrap>
                                <v-flex xs6 md12>
                                    <v-btn block color="info" v-on:click="modifyOne(task.id, task.title)">Modifier</v-btn>
                                </v-flex>
                                <v-flex xs6 md12>
                                    <v-btn block color="error" v-on:click="deleteOne(task.id)">Supprimer</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>

            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {
                taskText: '',
            }
        },
        methods: {
            addorRemoveTag: function (id, tag) {
                this.modifyTaskTag({id, tag})
                this.$forceUpdate()
            },
            addOne: function () {
                if (this.taskText.trim() === '') return
                this.addTask({ title: this.taskText, important: this.important, later: this.later})
                this.taskText = ''
                this.later = false
                this.important = false
            },
            deleteOne: function (id) {
                this.deleteTask(id)
            },
            modifyOne: function (id, text) {
                const newText = prompt('Modifier la tâche', text)
                this.modifyTask({id, newText})
            },
            ...mapActions(['addTask', 'deleteTask', 'modifyTask', 'modifyTaskTag', 'getAllTasks']),
        },
        created() {
            this.getAllTasks()
        },
        computed: {
            ...mapGetters({
                'tasks': 'getTasks',
            }),
        },
    }
</script>

<style>
    .task {
        margin: 20px;
    }
</style>
