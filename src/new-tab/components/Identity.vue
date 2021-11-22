<template>
  <div
    ref="identity-tile"
    class="identity-tile col-2"
    @click="$emit('switch', identity)"
  >
    <button
      type="button"
      class="identity-tile__edit-btn"
      @click="$emit('edit', identity, $event)"
    >
      <span class="edit-btn__icon" />
    </button>
    <div class="ratio ratio-1x1">
      <div
        class="centered"
        :style="{backgroundColor: identity.colorCode}"
      >
        <span
          :style="{
            'mask-image': `url(${identity.iconUrl})`,
          }"
          class="icon"
        />
        {{ identity.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// interfaces
import { Identity as IIdentity } from '@/shared/interfaces/Identity';

defineProps<{
  identity: IIdentity
}>()

defineEmits<{
  (e: 'edit', identity: IIdentity, event: any): void
  (e: 'switch', identity: IIdentity): void
}>()
</script>
