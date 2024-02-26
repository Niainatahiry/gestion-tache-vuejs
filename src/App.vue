<script setup>
import './assets/app.css'
import { CreditCardIcon } from '@heroicons/vue/24/solid'
import { UserIcon } from '@heroicons/vue/24/solid'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

// Utilisez useRouter pour accéder au router
const router = useRouter()

// Utilisez useStore pour accéder au store Vuex
const store = useStore()

// Accéder à l'état isLoggedIn
// Vérifier le token au démarrage
store.dispatch('checkToken')
const isLoggedIn = computed(() => store.state.auth.isLoggedIn)


// Fonction pour déconnecter l'utilisateur
const logout = () => {
  localStorage.removeItem('token')
  // Mettre à jour l'état de connexion dans le store Vuex
  store.dispatch('updateIsLoggedIn', false)
  console.log(`la valeur après déconnexion: ${isLoggedIn.value}`)
  console.log(`token après déconnexion: ${localStorage.getItem('token')}`)
  // Utilisez router.push pour la redirection
  router.push('/connexion')
}
</script>

<template>
  <div class="main-container">
    <div class="app-container">
      <div class="sidebar">
        <router-link v-if="!isLoggedIn" :to="{ name: 'inscription' }">Inscription <span><CreditCardIcon class="nav-icon" /></span></router-link>
        <router-link v-if="!isLoggedIn" :to="{ name: 'connexion' }">Se connecter <span><UserIcon class="nav-icon" /></span></router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'taskList' }">Liste des tâches <span><ClipboardDocumentListIcon class="nav-icon" /></span></router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'creerTache' }">Ajouter une tâche<span><PlusCircleIcon class="nav-icon" /></span></router-link>
        <button v-if="isLoggedIn" @click="logout" class="button-deconnexion">Déconnexion <ArrowRightStartOnRectangleIcon class="nav-icon" /></button>
      </div>
      <router-view />
    </div>
  </div>
</template>
