<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
  setup() {
    const router = useRouter()

    const store = useStore()
    const editingTask = ref(store.state.tasks.editingTask)
    const username = ref(editingTask.value ? editingTask.value.title : '')
    const description = ref(editingTask.value ? editingTask.value.description : '')
    const status = ref(editingTask.value ? editingTask.value.status : false)

    const submitForm = () => {
      if (username.value && description.value) {
        const updatedTask = {
          id: editingTask.value.id,
          title: username.value,
          description: description.value,
          status: status.value
        }
        // Utilisez le nom complet de l'action, y compris le nom du module
        store.dispatch('updateTask', updatedTask)
        router.push('/taskList')
        // Rediriger vers la liste des tâches ou la page précédente
      } else {
        // Gérer les erreurs de validation
      }
    }

    return {
      username,
      description,
      status,
      submitForm
    }
  }
}
</script>

<template>
  <div class="formulaire-container">
    <div class="formulaire create-formulaire">
      <form @submit.prevent="submitForm" class="inscription-formulaire">
        <div class="input-container">
          <label for="username">Titre:</label>
          <input id="username" v-model="username" type="text" placeholder="Titre de la tâche" />
        </div>
        <div class="input-container">
          <label for="password">Description:</label>
          <textarea
            id="password"
            v-model="description"
            placeholder="Description de la tâche"
            class="text-area"
          />
        </div>
        <div class="show-passowrd-container">
          <input type="checkbox" v-model="status" />
          <span>Tâche achevée</span>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  </div>
</template>
