var colors = {
  blue: "#37adff",
  turquoise: "#00c79a",
  green: "#51cd00",
  yellow: "#ffcb00",
  orange: "#ff9f00",
  red: "#ff613d",
  pink: "#ff4bda",
  purple: "#af51f5",
  toolbar: "#000000",
}

var icons = {
  fingerprint: "resource://usercontext-content/fingerprint.svg",
  briefcase: "resource://usercontext-content/briefcase.svg",
  dollar: "resource://usercontext-content/dollar.svg",
  cart: "resource://usercontext-content/cart.svg",
  vacation: "resource://usercontext-content/vacation.svg",
  gift: "resource://usercontext-content/gift.svg",
  food: "resource://usercontext-content/food.svg",
  fruit: "resource://usercontext-content/fruit.svg",
  pet: "resource://usercontext-content/pet.svg",
  tree: "resource://usercontext-content/tree.svg",
  chill: "resource://usercontext-content/chill.svg",
  circle: "resource://usercontext-content/circle.svg",
  fence: "resource://usercontext-content/fence.svg",
}

var tilePadding = 0;
var identityTiles = null;
var tileTemplate = null;
var editModal = null;
var confirmeDeleteModal = null;
var editModalOpened = false;
var keyboardActivated = false;
var selectedIdentity = null;

var keyBindings = {};

// tile's click handler
function tileClickHandler(event) {
  let target = event.target;
  if (!target.classList.contains('identity-tile')) {
    target = target.closest('.identity-tile');
  }

  if (!target.classList.contains('identity-tile')) return;

  browser.tabs.getCurrent().then((tabInfo) => {
    browser.tabs.create({
      cookieStoreId: target.dataset.cookieStoreId,
      index: tabInfo.index+1,
    });
    browser.tabs.remove(tabInfo.id);
  }, () => console.error('Cannot change contextual identity for current tab'));

  event.preventDefault();
  event.stopPropagation();
}

// tile's hover handler
function tileHoverHandler(event) {
  let target = event.target;
  if (!target.classList.contains('identity-tile')) {
    target = target.closest('.identity-tile');
  }

  if (!target.classList.contains('identity-tile')) return;

  let editNode = target.querySelector('.edit');
  let badgeNode = target.querySelector('.badge');

  let top, right, left, isHover, padding;

  if (editNode && editNode.classList.contains('edit')) {
    top = getComputedStyle(target).paddingTop;
    right = getComputedStyle(target).paddingRight;

    if (!top || !right) return;

    isHover = target.matches(':hover');

    padding = 10 + (target.matches(':hover') ? 0 : tilePadding);
    editNode.style.top = padding + 'px';
    editNode.style.right = padding + 'px';
  }

  if (badgeNode && badgeNode.classList.contains('badge')) {
    top = getComputedStyle(target).paddingTop;
    left = getComputedStyle(target).paddingLeft;

    if (!top || !left) return;

    isHover = target.matches(':hover');

    padding = 10 + (target.matches(':hover') ? 0 : tilePadding);
    badgeNode.style.top = padding + 'px';
    badgeNode.style.left = padding + 'px';
  }
}

// tile's edit button handler
function tileEditHandler(event) {
  let target = event.target;
  if (!target.classList.contains('identity-tile')) {
    target = target.closest('.identity-tile');
  }

  if (!target.classList.contains('identity-tile')) return;

  selectedIdentity = {
    cookieStoreId: target.dataset.cookieStoreId,
    name: target.dataset.name,
  };
  initModalWithIdentity({
    cookieStoreId: target.dataset.cookieStoreId,
    name: target.dataset.name,
    color: target.dataset.color,
    icon: target.dataset.icon,
  });
  editModal.show();

  event.preventDefault();
  event.stopPropagation();
}

// function to set modal with identity
function initModalWithIdentity(identity) {
  if (null !== identity) {
    for (const color of document.querySelectorAll('.select-color label')) {
      color.classList.remove('active');
    }
    if (document.querySelector(`.select-color label[data-color=${identity.color}]`)) {
      document
        .querySelector(`.select-color label[data-color=${identity.color}]`)
        .classList.add('active');
    }
    for (const icon of document.querySelectorAll('.select-icon label')) {
      icon.classList.remove('active');
    }
    if (document.querySelector(`.select-icon label[data-icon=${identity.icon}]`)) {
      document
        .querySelector(`.select-icon label[data-icon=${identity.icon}]`)
        .classList.add('active');
    }

    document.querySelector('#identityName').value = identity.name;

    document.querySelector('#modalDelete').removeAttribute('disabled');
  } else {
    for (const color of document.querySelectorAll('.select-color label')) {
      color.classList.remove('active');
    }
    for (const icon of document.querySelectorAll('.select-icon label')) {
      icon.classList.remove('active');
    }
    document.querySelector('#identityName').value = 'New identity';
  }
}

// function to create tile
function createTile(identity) {
  if (null === tileTemplate.content.querySelector('.identity-tile')) {
    return null;
  }
  let node = tileTemplate.content.querySelector('.identity-tile').cloneNode(true);
  if (node.querySelector('.icon')) {
    node.querySelector('.icon').setAttribute('src', identity.iconUrl);
  }
  if (node.querySelector('.name')) {
    node.querySelector('.name').innerText = identity.name;
  }
  if (node.querySelector('.centered')) {
    node.querySelector('.centered').style.backgroundColor = identity.colorCode;
  }
  node.setAttribute('data-identity', identity.cookieStoreId);

  node.dataset.cookieStoreId = identity.cookieStoreId;
  node.dataset.name = identity.name;
  node.dataset.color = identity.color;
  node.dataset.colorCode = identity.colorCode;
  node.dataset.icon = identity.icon;
  node.dataset.iconUrl = identity.iconUrl;

  node.addEventListener('click', tileClickHandler);

  if (identity.cookieStoreId) {
    // can edit only identities
    node.addEventListener('mouseover', tileHoverHandler);
    node.addEventListener('mouseout', tileHoverHandler);

    node.querySelector('.edit').addEventListener('click', tileEditHandler);
  } else {
    // cannot edit "no contextual identity" identity
    node.querySelector('.edit').remove();
  }
  return node;
}

// function to update tile height to be squared
function updateTileHeight(tile) {
  if (null === tile || undefined === tile) {
    identityTiles.childNodes.forEach(element => {
      if ('TEMPLATE' === element.tagName || undefined === element.tagName)
        return;
      updateTileHeight(element);
    });
    return;
  };
  tilePadding = getComputedStyle(tile).paddingLeft;

  if (!tilePadding) return;

  tilePadding = parseInt(tilePadding.substring(0, tilePadding.length - 2));

  tile.style.paddingTop = tilePadding + 'px';
  tile.style.paddingBottom = tilePadding + 'px';
  tile.style.height = tile.offsetWidth + 'px';
}

function updateIdentity(identity) {
  let tile = identityTiles
    .querySelector(`[data-identity=${identity.cookieStoreId}]`);
  if (tile) {
    tile.dataset.name = identity.name;
    tile.dataset.color = identity.color;
    tile.dataset.colorCode = colors[identity.color];
    tile.dataset.icon = identity.icon;
    tile.dataset.iconUrl = icons[identity.icon];
    tile.querySelector('.name').innerHTML = identity.name;
    tile.querySelector('.centered').style.backgroundColor = colors[identity.color];
    tile.querySelector('.icon').setAttribute('src', icons[identity.icon]);
  }
}

function saveIdentityFromModal() {
  let name = document.querySelector('#identityName').value;
  let color = document
    .querySelector('.select-color label.active')
    .getAttribute('data-color');
  let icon = document
    .querySelector('.select-icon label.active')
    .getAttribute('data-icon');
  if (selectedIdentity) {
    browser.contextualIdentities
      .update(selectedIdentity.cookieStoreId, {
        name: name,
        color: color,
        icon: icon
      }).then((identity) => {
        updateIdentity(identity);
        resetKeyBindings();
      });
      selectedIdentity = null;
  } else {
    browser.contextualIdentities
      .create({
        name: name,
        color: color,
        icon: icon
      }).then((identity) => {
        identityTiles.appendChild(createTile(identity));
        updateTileHeight();
        resetKeyBindings();
        let tile = identityTiles
          .querySelector(`[data-identity='']`);
        identityTiles.appendChild(tile);
      });
  }

  editModal.hide();
}

function cancelIdentityFromModal() {
  editModal.hide();
}

function deleteIdentityFromModal() {
  editModal.hide();
  document
    .querySelector('#confirmDeleteModal .identity-to-del')
    .innerHTML = selectedIdentity.name;
  console.log('pouet', confirmDeleteModal);
  confirmDeleteModal.show();
}

function confirmDeleteModalCancel() {
  confirmDeleteModal.hide();
  editModal.show();
}

function confirmDeleteModalConfirm() {
  browser.contextualIdentities.remove(selectedIdentity.cookieStoreId).then(() => {
    let tile = identityTiles
      .querySelector(`[data-identity=${selectedIdentity.cookieStoreId}]`);
      tile.remove();
    confirmDeleteModal.hide();
  });
}

function resetKeyBindings() {
  keyBindings = {};
  const tiles = identityTiles.querySelectorAll(`[data-identity]`);
  if (!tiles) return;
  keys = [];
  for (const tile of tiles) {
    let name = tile.getAttribute('data-name');
    let identity = tile.getAttribute('data-identity');
    if (!name) return;
    name = name.toLowerCase();
    keys.push({
      identity,
      name,
      tile,
    });
  }
  keys.sort((a, b) => {
    if (a.name.toLowerCase()[0] < b.name.toLowerCase()[0])
      return 1;
    if (a.name.toLowerCase()[0] > b.name.toLowerCase()[0])
      return -1;
    return 0;
  });
  for (const tile of keys) {
    let name = tile.name.toLowerCase();
    for (const c of name) {
      if (!keyBindings.hasOwnProperty(c)) {
        let badge = tile.tile.querySelector('.badge');
        if (!badge) break;
        keyBindings[c] = tile.tile;
        badge.innerText = c;
        break;
      }
    }
  }
}

function toggleKeyboard(activate = null) {
  if (null === activate) {
    keyboardActivated = !keyboardActivated;
  } else {
    keyboardActivated = !!activate;
  }

  const badges = identityTiles.querySelectorAll('.badge');
  for (const badge of badges) {
    if (keyboardActivated) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  }
}

// on page load, create tiles
window.addEventListener('load', init);

function init() {
  if (browser.contextualIdentities === undefined) {
    identityTiles.innerText = 'ContextualIdentities not available. '+
      'Check that the privacy.userContext.enabled pref is set to true, and reload the add-on.';
  } else {
    identityTiles = document.querySelector('#identityTiles');
    tileTemplate = document.querySelector('#tileTemplate');
    editModal = new bootstrap.Modal(document.querySelector('#editModal'));
    confirmDeleteModal = new bootstrap.Modal(document.querySelector('#confirmDeleteModal'));

    document
      .querySelector('#modalSave')
      .addEventListener('click', saveIdentityFromModal);
    document
      .querySelector('#modalCancel')
      .addEventListener('click', cancelIdentityFromModal);
    document
      .querySelector('#modalDelete')
      .addEventListener('click', deleteIdentityFromModal);

    document
      .querySelector('#deleteModalCancel')
      .addEventListener('click', confirmDeleteModalCancel);
    document
      .querySelector('#deleteModalConfirm')
      .addEventListener('click', confirmDeleteModalConfirm);

    document
      .querySelector('#addIdentity')
      .addEventListener('click', () => {
        initModalWithIdentity(null);

        editModal.show();
      });

    console.log(editModal._element);
    const editModalEl = editModal._element;
    const confirmDeleteModalEl = confirmDeleteModal._element;

    editModalEl.addEventListener('show.bs.modal', () => {
      editModalOpened = true;
    });
    editModalEl.addEventListener('hide.bs.modal', () => {
      editModalOpened = false;
    });

    confirmDeleteModalEl.addEventListener('show.bs.modal', () => {
      editModalOpened = true;
    });
    confirmDeleteModalEl.addEventListener('hide.bs.modal', () => {
      editModalOpened = false;
    });

    document.addEventListener('keyup', (event) => {
      if (editModalOpened || !event.key) return;

      let key = event.key.toLowerCase();

      if (!keyboardActivated && 'f' === event.key) {
        toggleKeyboard();
        //keyboardActivated = true;
        //return;
      } else if (
        keyboardActivated
        && ('Escape' === event.key || 'Backspace' === event.key)
      ) {
        toggleKeyboard(false);
      } else if (keyboardActivated) {
        if (keyBindings.hasOwnProperty(event.key)) {
          keyBindings[event.key].click();
        }
      }
    });

    browser.contextualIdentities.query({})
      .then((identities) => {
        if (!identities.length) {
          identityTiles.innerText = 'No identities returned from the API.';
          return;
        }

        for (let identity of identities) {
          let node = createTile(identity);
          identityTiles.appendChild(node);
        }
        identityTiles.appendChild(createTile({
          cookieStoreId: '',
          iconUrl: icons.circle,
          colorCode: '#a2a2a2',
          name: 'Without identitiy',
        }));

        setTimeout(() => {
          updateTileHeight();
          resetKeyBindings();
        }, 200);
      });

    for (const color of document.querySelectorAll('.select-color label')) {
      color.addEventListener('click', () => {
        for (const colorLabel of document.querySelectorAll('.select-color label.active')) {
          colorLabel.classList.remove('active');
        }
        color.classList.add('active');
      });
    }
    for (const icon of document.querySelectorAll('.select-icon label')) {
      icon.addEventListener('click', () => {
        for (const iconLabel of document.querySelectorAll('.select-icon label.active')) {
          iconLabel.classList.remove('active');
        }
        icon.classList.add('active');
      });
    }
  }
}
