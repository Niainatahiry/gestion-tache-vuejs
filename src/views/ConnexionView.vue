<script>
import image from '@/assets/images/task-image.jpg'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const showPassword = ref(false)


    const submitForm = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (
          storedUser &&
          storedUser.username === username.value &&
          storedUser.password === password.value
        ) {
          // Générer un token et le stocker dans le localStorage
          const token = uuidv4()
          localStorage.setItem('token', token)
          // Mettre à jour l'état isLoggedIn via Vuex
          store.dispatch('updateIsLoggedIn', true)
          // Rediriger vers la page des tâches
          await router.push('/taskList')
        } else {
          alert("Nom d'utilisateur ou mot de passe incorrect.")
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error)
      }
    }

    return {
      username,
      password,
      img: image,
      submitForm,
      showPassword
    }
  }
}
</script>

<template>
  <div class="inscription-container">
    <div class="title-description-container">
      <div class="title-description">
        <div class="title">
          <h1>Connexion</h1>
          <p>Connectez-vous !</p>
        </div>
        <div class="description">
          <img :src="img" alt="" class="description-image" />
          <div class="text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magni sunt quos
              eveniet alias minima!
            </p>
            <router-link :to="{ name: 'inscription' }">S'inscrire</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="formulaire-container">
      <div class="formulaire">
        <form @submit.prevent="submitForm" class="inscription-formulaire">
          <div class="input-container">
            <label for="username">Nom d'utilisateur:</label>
            <input id="username" v-model="username" type="text" placeholder="Nom d'utilisateur" />
          </div>
          <div class="input-container">
            <label for="password">Mot de passe:</label>
            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" />
          </div>
          <div class="show-passowrd-container">
            <input type="checkbox" v-model="showPassword"/>
            <span>Montrer mot de passe</span>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>
