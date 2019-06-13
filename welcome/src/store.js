import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Generates a random number between 0 and 199
const generateId = () => Math.floor(Math.random() * 199)

export default new Vuex.Store({
    state: {
        tasks: [
            /*{
              id: 0,
              title: 'Do this ASAP',
              done: false,
              important: true,
              later: false,
            },
            {
              id: 0,
              title: 'Do that When you can',
              done: false,
              important: false,
              later: true,
            },*/
        ],
    },
    mutations: {
        addNewTask: (state, obj) => {
            state.tasks.unshift({...obj, id: generateId(), done: false})
        },
        deleteTask: (state, taskID) => {
            state.tasks = state.tasks.filter(task => task.id !== taskID);
        },
        setTasks: (state, tasks) => {
            state.tasks = tasks;
        },
        modifyTask: (state, {id, text}) => {
            const indexToChange = state.tasks.findIndex(task => task.id === id)
            if (indexToChange === -1) return console.error("Cannot find index to modify")
            state.tasks[indexToChange].title = text
        },
        modifyTaskTag: (state, {id, tag}) => { console.log('CALED', id, tag)
            const indexToChange = state.tasks.findIndex(task => task.id === id)
            if (indexToChange === -1) return console.error("Cannot find index to modify")
            state.tasks[indexToChange][tag] = !state.tasks[indexToChange][tag]
        },
    },
    actions: {
        addTask({commit}, task) {
            fetch(`https://jsonplaceholder.typicode.com/todos`, {method: 'post', body: JSON.stringify({title: task.title})})
                .then(response => response.json())
                .then(result => {
                    commit('addNewTask', task)
                })
                .catch(error => {
                    console.log('Error while trying to create data', error)
                })
        },
        deleteTask({commit}, taskID) {
            fetch(`https://jsonplaceholder.typicode.com/todos/${taskID}`, {method: 'delete'})
                .then(response => response.json())
                .then(result => {
                    commit('deleteTask', taskID)
                })
                .catch(error => {
                    console.log('Error while trying to create data', error)
                })
        },
        modifyTask({commit}, {id, newText: text}) {
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {method: 'put', body: JSON.stringify({title: text})})
                .then(response => response.json())
                .then(result => {
                    commit('modifyTask', {id, text})
                })
                .catch(error => {
                    console.log('Error while trying to update data', error)
                })
        },
        getAllTasks({commit}) {
            fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
                .then(response => response.json())
                .then(result => {
                    commit('setTasks', result)
                })
                .catch(error => {
                    console.log('Error while trying to retrieve data from API', error)
                })
        },
        modifyTaskTag({commit}, {id, tag}) {
            commit('modifyTaskTag', {id, tag})
        }
    },
    getters: {
        getTasks(state) {
            return state.tasks;
        },
    }
})
