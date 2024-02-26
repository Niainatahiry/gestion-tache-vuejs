// store.js
import { createStore } from 'vuex'

// Module pour les tâches
// Module pour les tâches
const tasksModule = {
  state: () => ({
    tasks: [],
    nextTaskId:  1,
    editingTask: null
  }),
  mutations: {
    loadTasks(state) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || []
      state.tasks = tasks
      state.nextTaskId = localStorage.getItem('nextTaskId')
        ? parseInt(localStorage.getItem('nextTaskId'))
        :  1
    },
    addTask(state, task) {
      task.id = state.nextTaskId++
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      localStorage.setItem('nextTaskId', state.nextTaskId)
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    setEditingTask(state, task) {
      state.editingTask = task
    },
    clearEditingTask(state) {
      state.editingTask = null
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index,  1, updatedTask)
      }
    }
  },
  actions: {
    loadTasks({ commit }) {
      commit('loadTasks')
    },
    saveTask({ commit }, task) {
      commit('addTask', task)
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId)
    },
    editTask({ commit }, task) {
      commit('setEditingTask', task)
    },
    cancelEditing({ commit }) {
      commit('clearEditingTask')
    },
    updateTask({ commit, state }, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        // Utiliser la mutation pour mettre à jour la tâche
        commit('updateTask', updatedTask)
        // Mettre à jour la tâche dans le localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
        // Réinitialiser la tâche en cours de modification
        commit('clearEditingTask')
      }
    }
  }
}


// Module pour l'état de connexion
const authModule = {
  state: () => ({
    isLoggedIn: false
  }),
  mutations: {
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value
    }
  },
  actions: {
    updateIsLoggedIn({ commit }, value) {
      commit('setIsLoggedIn', value)
    },
    checkToken({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('setIsLoggedIn', true)
      } else {
        commit('setIsLoggedIn', false)
      }
    }
  }
}

export default createStore({
  modules: {
    tasks: tasksModule,
    auth: authModule
  }
})
