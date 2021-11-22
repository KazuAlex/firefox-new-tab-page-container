<template>
  <div class="actions">
    <button
      class="actions__open-btn btn"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span
        v-if="isMenuOpen"
        class="open-btn__close"
      />
      <span
        v-else
        class="open-btn__open"
      />
    </button>
    <div
      v-show="isMenuOpen"
      class="actions__submenu"
    >
      <button
        class="submenu__btn btn btn--small"
        @click="$emit('add')"
      >
        <span
          class="btn__add"
        />
      </button>
      <button
        class="submenu__btn btn btn--small"
        @click="toggleDarkMode"
      >
        <span
          v-if="isDarkMode"
          class="btn__light"
        />
        <span
          v-else
          class="btn__dark"
        />
      </button>
    </div>
  </div>
</template>

<script setup type="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);
const isDarkMode = ref(false);

browser.storage.local
  .get('isDarkMode')
  .then((results) => {
    isDarkMode.value = results.isDarkMode || false;
  });

function toggleDarkMode() {
  console.log('toggleDarkMode');
  isDarkMode.value = !isDarkMode.value;
  document.querySelector('body')?.classList.toggle('dark', isDarkMode.value);
  browser.storage.local.set({isDarkMode: isDarkMode.value});
}
</script>
