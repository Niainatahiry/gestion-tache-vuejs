<script>
import "@/assets/taskList.css"
import { PencilSquareIcon,TrashIcon } from '@heroicons/vue/24/solid'
import { useStore } from 'vuex'
import { computed } from "vue"
import { useRouter } from "vue-router"

export default {
  components: {
    PencilSquareIcon,
    TrashIcon,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // Charger les tâches au démarrage
    store.dispatch('loadTasks')

    // Accéder aux tâches via le module 'tasks'
    const tasks = computed(() => store.state.tasks.tasks)
    // Méthode pour modifier une tâche
    const editTask = (task) => {
      store.dispatch('editTask', task),
      router.push('/editTask')
      // Rediriger vers la page/composant d'édition de tâche
      // Vous pouvez utiliser Vue Router pour cela
    }
      // Méthode pour supprimer une tâche
  const deleteTask = (taskId) => {
    
    store.dispatch('deleteTask', taskId)
  }
    return {
      tasks,
      deleteTask,
      editTask
    }
  }
}
</script>

<template>
  <div class="tasklist-container">
    <div v-for="(task, id) in tasks" :key="id" class="task-container">
      <h3 class="titre">{{ task.title }}</h3>
      <p class="description">{{ task.description }}</p>
      <p class="status">status: {{ task.status ? '✅' : '❌' }}</p>
      <div class="action-container">
        <PencilSquareIcon class="icon"   @click="editTask(task)" />
        <TrashIcon class="icon"  @click="deleteTask(task.id)" />
      </div>
    </div>
  </div>
</template>
