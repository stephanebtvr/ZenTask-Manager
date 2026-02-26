<script lang="ts" setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
<template>
  <footer class="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
    <div class="flex flex-row justify-center items-center gap-5">
      <a href="mailto:stephane.bettaver@gmail.com" class="social-link">
        <svg
          class="icon-svg fill-slate-900 dark:fill-slate-100 hover:fill-slate-600 dark:hover:fill-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm-.41,2-5.88,5.88a1,1,0,0,1-1.42,0L5.41,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V7.41l5.88,5.88a3,3,0,0,0,4.24,0L20,7.41Z"
          />
        </svg>
      </a>

      <a href="https://linkedin.com/in/stephane-btvr" target="_blank" class="social-link">
        <svg
          class="icon-svg fill-[#0077b5] dark:fill-[#0a66c2] hover:opacity-80"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
      </a>
    </div>
    © {{ currentYear }} Bettaver Stéphane - Tous droits réservés
  </footer>
</template>
<style scoped>
/* On garde uniquement la gestion de la taille et de l'animation ici */
.icon-svg {
  width: 18px;
  height: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
}

@media (min-width: 768px) {
  .icon-svg {
    width: 24px;
    height: 24px;
  }
}

.social-link:hover .icon-svg {
  transform: translateY(-2px);
}

/* Nettoyage des liens pour éviter les flashs de couleur */
a {
  -webkit-tap-highlight-color: transparent;
  background-color: transparent !important;
  display: flex;
}
</style>
