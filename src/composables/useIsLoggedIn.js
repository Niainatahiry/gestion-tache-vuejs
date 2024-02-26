// src/composables/useIsLoggedIn.js
import { ref, watchEffect } from 'vue';

export function useIsLoggedIn() {
  const isLoggedIn = ref(localStorage.getItem('token') !== null);

  watchEffect(() => {
    isLoggedIn.value = localStorage.getItem('token') !== null;
  });

  return { isLoggedIn };
}
