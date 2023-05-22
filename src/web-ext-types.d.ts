// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="/web-ext-types/global/index.d.ts" />

declare namespace browser.contextualIdentities {
  export type ContextualIdentity = browser.contextualIdentities.ContextualIdentity & {
    colorCode: string,
    iconUrl: string,
  };
}
