# New tab page container

This repository contains the code for [Firefox Add-ons page](https://addons.mozilla.org/firefox/addon/new-tab-page-container/) extension for Firefox.  
The extension is built on top of [Firefox Multi-Account Containers](https://addons.mozilla.org/firefox/addon/multi-account-containers/) extension.  
It show you all your identities on the new tab page.

## Download add-on

[Firefox Add-ons page](https://addons.mozilla.org/firefox/addon/new-tab-page-container/)

## Configuration

### Theme

You can change the theme for the new tab to :

- System: use system theme
- Light: force light theme
- Dark: force dark theme

### Ignored containers

This settings will hide identities specified in this field.  
You can use the Javascript's [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

## Next steps

- [ ] Change the default order for the identities in the main page
- [ ] Change how many identities in one line
- [ ] Add another type of card in main page (link, ... ?)
