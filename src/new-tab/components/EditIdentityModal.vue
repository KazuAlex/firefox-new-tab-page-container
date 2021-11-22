<template>
  <div
    :class="{ backdrop: backdrop }"
    @click="backdropClickHandler"
  >
    <div class="modal">
      <div class="modal__header">
        <slot name="header">
          <div class="default">
            <h5>
              {{ title }}
            </h5>
            <button
              type="button"
              aria-label="close"
              class="btn-close"
              @click="$emit('close')"
            >
              <span class="btn-close__icon" />
              <!-- <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg> -->
            </button>
          </div>
        </slot>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer">
          <div class="default">
            <div>
              <button
                v-if="cancelBtn"
                class="modal__cancel"
                @click="closeEvent"
              >
                Cancel
              </button>
              &nbsp;
              <button
                v-if="saveBtn"
                class="modal__save"
                @click="saveEvent"
              >
                Save
              </button>
            </div>
            <button
              v-if="deleteBtn"
              class="modal__delete"
              @click="deleteEvent"
            >
              Delete
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    backdrop?: boolean | string
    deleteBtn?: boolean
    cancelBtn?: boolean
    saveBtn?: boolean
    title?: string
  }>(),
  {
    backdrop: 'static',
    deleteBtn: false,
    cancelBtn: true,
    saveBtn: true,
    title: '',
  }
);

const $emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
  (e: 'delete'): void
}>()

function toggleStaticBackdrop(value: boolean) {
  if ('static' === props.backdrop)
    document.querySelector('body')?.classList.toggle('static', value);
}

onMounted(() => {
  toggleStaticBackdrop(true);
})

onUnmounted(() => {
  toggleStaticBackdrop(false);
})

function backdropClickHandler($event: any) {
  if ($event?.target?.classList.contains('backdrop'))
    closeEvent();
}

function closeEvent() {
  $emit('close');
}

function saveEvent() {
  $emit('save');
}

function deleteEvent() {
  $emit('delete');
}
</script>
