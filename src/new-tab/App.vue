<template>
  <template v-if="!hasContextualIdentities">
    ContextualIdentities not available. Check that the privacy.userContext.enabled pref is set to true, and reload the add-on.
  </template>
  <template v-else>
    <IdentityList />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IdentityList from './components/IdentityList.vue';

browser.storage.local
  .get('isDarkMode')
  .then((results: any) => {
    const isDarkMode = results.isDarkMode || false;
    if (!results.isDarkMode)
      browser.storage.local.set({isDarkMode: false});
    document.querySelector('body')?.classList.toggle('dark', isDarkMode);
  })

const hasContextualIdentities = computed(() => {
  return undefined !== browser.contextualIdentities;
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
