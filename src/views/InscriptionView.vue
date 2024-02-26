<script>
import '@/assets/inscription.css'
import image from '@/assets/images/task-image.jpg'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const img = ref(image)
    const store = useStore()
    const router = useRouter()
    const showPassword = ref(false)

    const getNextId = () => {
      let currentId = localStorage.getItem('lastUserId')
      if (currentId === null) {
        currentId =  1
      } else {
        currentId = parseInt(currentId,  10) +  1
      }
      localStorage.setItem('lastUserId', currentId)
      return currentId
    }

    const submitForm = () => {
      const userData = {
        id: getNextId(),
        username: username.value,
        password: password.value
      }
      // Stocker les données dans le localStorage
      localStorage.setItem('user', JSON.stringify(userData))

      const storedUser = JSON.parse(localStorage.getItem('user'))

      if (
        storedUser &&
        storedUser.id === userData.id &&
        storedUser.username === userData.username &&
        storedUser.password === userData.password
      ) {
        // Si les données correspondent, rediriger vers la page '/taskList'
        // Stocker le token pour gérer la connexion
        const token = uuidv4()
        localStorage.setItem('token', token)
        // Utiliser Vuex pour mettre à jour l'état de connexion
        store.dispatch('updateIsLoggedIn', true)
        router.push('/taskList')
      } else {
        alert("erreur lors de l'insertion des données")
      }
    }

    return {
      username,
      password,
      img,
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
          <h1>inscription</h1>
          <p>Inscrivez-vous !</p>
        </div>
        <div class="description">
          <img :src="img" alt="" class="description-image" />
          <div class="text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magni sunt quos
              eveniet alias minima!
            </p>
            <router-link :to="{ name: 'connexion' }">Se connecter</router-link>
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
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  </div>
</template>
