import { useMemo, useState } from 'react';
import { ContextualIdentity } from '@/types/contextual-identities';
import { BrowserTab } from '@/types/browser';
import useSettingsStore from '@/stores/useSettingsStore';
import { shallow } from 'zustand/shallow';
import SortOrder from '@/types/sort-order';

function useContextualIdentities() {
  const [identities, setIdentities] = useState<ContextualIdentity[]>([]);

  const [ignoredContainers, sortOrder] = useSettingsStore(
    (state) => [state.ignoredContainers, state.sortOrder],
    shallow,
  );

  browser.contextualIdentities.query({})
    .then((contextualIdentities: unknown) => {
      setIdentities(contextualIdentities as ContextualIdentity[]);
    });

  const filteredIdentities = useMemo(() => {
    const ignored: RegExp[] = ignoredContainers?.length <= 0 ? [] : ignoredContainers
      .split(',')
      .map((element: string) => element.trim())
      .map((element: string) => new RegExp(element, 'i'));

    return identities
      .filter((identity) => !ignored.some((regexp) => regexp.test(identity.name)))
      .sort((a, b) => {
        if (sortOrder !== SortOrder.Default) {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          if (sortOrder === SortOrder.Asc) {
            if (aName > bName) {
              return 1;
            } else if (aName < bName) {
              return -1;
            }
          } else if (sortOrder === SortOrder.Desc) {
            if (aName > bName) {
              return -1;
            } else if (aName < bName) {
              return 1;
            }
          }
        }

        return 0;
      });
  }, [identities, ignoredContainers, sortOrder]);

  const switchIdentity = (identity: ContextualIdentity) => {
    browser.tabs.getCurrent()
      .then(
        (tabInfo: BrowserTab) => {
          browser.tabs.create({
            cookieStoreId: identity.cookieStoreId,
            index: tabInfo.index + 1,
          });
          browser.tabs.remove(tabInfo.id!);
        },
        () => console.error('Cannot change contextual identity for current tab'),
      );
  };

  const switchToNoIdentity = () => {
    browser.tabs.getCurrent()
      .then(
        (tabInfo: BrowserTab) => {
          browser.tabs.create({
            index: tabInfo.index + 1,
          });
          browser.tabs.remove(tabInfo.id!);
        },
        () => console.error('Cannot change contextual identity for current tab'),
      );
  };

  const createIdentity = (
    { name, color, icon }: Pick<ContextualIdentity, 'name' | 'color' | 'icon'>,
  ) => browser.contextualIdentities.create({
    name,
    color,
    icon,
  });

  const updateIdentity = (
    cookieStoreId: string,
    { name, color, icon }: Pick<ContextualIdentity, 'name' | 'color' | 'icon'>,
  ) => browser.contextualIdentities.update(cookieStoreId, {
    name,
    color,
    icon,
  });

  const removeIdentity = (cookieStoreId: string) => browser.contextualIdentities.remove(cookieStoreId);

  return {
    identities,
    filteredIdentities,
    setIdentities,
    switchIdentity,
    switchToNoIdentity,
    createIdentity,
    updateIdentity,
    removeIdentity,
  };
}

export default useContextualIdentities;
