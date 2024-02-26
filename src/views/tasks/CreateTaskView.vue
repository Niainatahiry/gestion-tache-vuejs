<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()

    // Définir les propriétés réactives
    const username = ref('')
    const description = ref('')

    const addTask = (task) => {
      store.dispatch('saveTask', task)
    }

    const submitForm = () => {
      // Créer un objet tâche avec les valeurs actuelles de username et description
      const task = {
        title: username.value,
        description: description.value,
        status: false // Vous pouvez définir un état par défaut  ici
      }
      // Appeler addTask avec l'objet tâche
      addTask(task)
      // Réinitialiser les champs du formulaire
      username.value = ''
      description.value = ''
    }

    return {
      username,
      description,
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
          <textarea id="password" v-model="description" placeholder="Description de la tâche" class="text-area"/>
        </div>
        <button type="submit">Créer la tâche</button>
      </form>
    </div>
  </div>
</template>
