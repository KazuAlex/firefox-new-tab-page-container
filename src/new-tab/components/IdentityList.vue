<template>
  <template v-if="!identities.length">
    No identities returned from the API.
  </template>
  <template v-else>
    <div class="container-fluid">
      <div class="row">
        <Identity
          v-for="identity in identities"
          :key="identity.cookieStoreId"
          :identity="identity"
          @switch="switchIdentity"
          @edit="editIdentity"
        />
      </div>
    </div>

    <teleport to="#modals">
      <EditIdentityModal
        v-if="sIdentity"
        backdrop="static"
        :deleteBtn="!!sIdentity?.cookieStoreId"
        :title="sIdentity.name"
        @close="closeEditIdentityModal"
        @save="saveIdentityFromModal"
        @delete="deleteIdentityFromModal"
      >
        <div class="identity-form">
          <div class="group mb-3">
            <label
              for="identity-form__name"
              class="form-label"
            >
              Name
            </label>
            <input
              id="identity-form__name"
              v-model="sIdentity.name"
              class="form-input"
            />
          </div>
          <div class="group mb-3">
            <label class="group__label">
              Color
            </label>
            <div class="group__buttons">
              <template
                v-for="color in Colors"
              >
                <div
                  class="group__btn"
                  :class="{ 'group__btn--selected': color.id === sIdentity.color }"
                  @click="sIdentity ? sIdentity.color = color.id : false"
                >
                  <span
                    class="group__btn__content color"
                    :style="`background-color: ${color.code}`"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="group">
            <label class="group__label">
              Icon
            </label>
            <div class="group__buttons">
              <template
                v-for="icon in Icons"
              >
                <div
                  class="group__btn"
                  :class="{ 'group__btn--selected': icon.id === sIdentity.icon }"
                  @click="sIdentity ? sIdentity.icon = icon.id : false"
                >
                  <span
                    class="group__btn__content icon"
                    :style="`mask-image: url('${icon.url}')`"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </EditIdentityModal>
    </teleport>
    <Actions
      @add="createNewIdentity"
    />
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// components
import Identity from './Identity.vue';
import EditIdentityModal from './EditIdentityModal.vue';
import Actions from './Actions.vue';

// interfaces
import { Identity as IIdentity } from '@/shared/interfaces/Identity';
import { Tab as ITab } from '@/shared/interfaces/Tab';

// enums
import { Colors, EColors, OColors } from '@/shared/enums/Colors';
import { EIcons, Icons, OIcons } from '@/shared/enums/Icons';

const identities = ref<IIdentity[]>([]);
const sIdentity = ref<IIdentity>();

browser.contextualIdentities.query({})
  .then((contextualIdentities: IIdentity[]) => {
    identities.value = contextualIdentities;
  })

function switchIdentity(identity: IIdentity) {
  browser.tabs.getCurrent().then((tabInfo: ITab) => {
    browser.tabs.create({
      cookieStoreId: identity.cookieStoreId,
      index: tabInfo.index+1,
    });

    browser.tabs.remove(tabInfo.id);
  },
  () => console.error('Cannot change contextual identity for current tab'),
  );
}

function editIdentity(identity: IIdentity, event: any) {
  event.stopPropagation();
  sIdentity.value = identity;
}

function closeEditIdentityModal() {
  sIdentity.value = undefined;
}

function saveIdentityFromModal() {
  if (sIdentity && sIdentity.value) {
    if (sIdentity.value?.cookieStoreId) {
      browser.contextualIdentities
        .update(sIdentity.value.cookieStoreId, {
          name: sIdentity.value.name,
          color: sIdentity.value.color,
          icon: sIdentity.value.icon,
        })
        .then((uIdentity: IIdentity) => {
          identities.value = identities.value.map((identity: IIdentity) => {
            return identity.cookieStoreId === uIdentity?.cookieStoreId
              ? uIdentity
              : identity
            ;
          });
        });
    } else {
      browser.contextualIdentities
        .create({
          name: sIdentity.value.name,
          color: sIdentity.value.color,
          icon: sIdentity.value.icon,
        })
        .then((uIdentity: IIdentity) => {
          identities.value.push(uIdentity);
        });
    }
  }
  sIdentity.value = undefined;
}

function deleteIdentityFromModal() {
  if (sIdentity.value?.cookieStoreId) {
    browser.contextualIdentities.remove(sIdentity.value.cookieStoreId);

    identities.value = identities.value.filter((identity: IIdentity) => {
      return sIdentity.value?.cookieStoreId !== identity.cookieStoreId;
    })
  }
  sIdentity.value = undefined;
}

function createNewIdentity() {
  sIdentity.value = {
    color: 'blue',
    colorCode: EColors.blue,
    icon: 'circle',
    iconUrl: EIcons.circle,
    name: 'New identity',
  }
}
</script>
