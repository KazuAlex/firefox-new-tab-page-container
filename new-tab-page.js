var colors = {
  blue: "#37adff",
  turquoise: "#00c79a",
  green: "#51cd00",
  yellow: "#ffcb00",
  orange: "#ff9f00",
  red: "#ff613d",
  pink: "#ff4bda",
  purple: "#af51f5",
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
}

var mode = 'open';

function isOpenMode() {
  return isMode('openMode');
}

function isEditMode() {
  return isMode('editMode');
}

function isMode(mode) {
  return $('#mode .btn.active input').attr('id') === mode;
}

function initModal() {
  const $colors = $('#containerColors');
  const $btnColorTemplate = $('<label class="btn btn-sm" />');
  const $btnColorInputTemplate = $('<input type="radio" name="containerColor" autocomplete="off" />');
  $btnColorTemplate.append($btnColorInputTemplate);
  for (const color in colors) {
    const $btnColor = $btnColorTemplate.clone();
    const $btnColorInput = $btnColor.find('input');
    const $btnColorSpan = $('<span>');
    $btnColor.css('background-color', colors[color]);
    $btnColor.attr('data-color', color);
    $btnColorSpan.html(' '+ color.charAt(0).toUpperCase() + color.slice(1));
    $btnColor.append($btnColorInput);
    $btnColor.append($btnColorSpan);
    $colors.append($btnColor);
  }

  const $icons = $('#containerIcons');
  const $btnIconTemplate = $('<label class="btn btn-sm" />');
  const $btnIconInputTemplate = $('<input type="radio" name="containerIcon" autocomplete="off" />');
  $btnIconTemplate.append($btnIconInputTemplate);
  for (const icon in icons) {
    const $btnIcon = $btnIconTemplate.clone();
    const $btnIconInput = $btnIcon.find('input');
    const $btnIconImg = $('<img>');
    $btnIcon.attr('data-icon', icon);
    $btnIconImg.attr('src', icons[icon]);
    $btnIcon.append($btnIconInput);
    $btnIcon.append($btnIconImg);
    $icons.append($btnIcon);
  }
}

function createIdentityModal() {
  identityModal('Create new identity', null);

  $('#containerModal').modal('show');
}

function identityModal(title, identity) {
  $('#containerModalTitle').html(title);
  $('#containerIdentity').val(identity ? identity.cookie : '');
  $('#containerName').val(identity ? identity.name : 'New identity');
  $('#containerColors .btn').removeClass('active');
  $('#containerIcons .btn').removeClass('active');
  $('#deleteContainer').prop('disabled', true);
  if (identity) {
    $('#containerColors').find('[data-color="'+identity.color+'"]').addClass('active');
    $('#containerIcons').find('[data-icon="'+identity.icon+'"]').addClass('active');
    $('#deleteContainer').prop('disabled', false);
  } else {
    $('#containerColors').find('[data-color="blue"]').addClass('active');
    $('#containerIcons').find('[data-icon="circle"]').addClass('active');
  }
}

function editIdentityModal(event) {
  const $tile = $(event.relatedTarget);
  if ($tile.data('identity')) {
    identity = {
      cookie: $tile.data('identity'),
      name: $tile.data('name'),
      color: $tile.data('color'),
      icon: $tile.data('icon'),
    }
    identityModal('Edit identity', identity);
  }
}

function submitContainerFromModal(event) {
  const identity = $('#containerIdentity').val();
  let name = $('#containerName').val();
  name = name ? name : 'New identity';
  let color = $('#containerColors .active').data('color');
  color = color ? color : colors.blue;
  let icon = $('#containerIcons .active').data('icon');
  icon = icon ? icon : icon.circle;

  if (identity) {
    browser.contextualIdentities.update(identity, {
      name: name,
      color: color,
      icon: icon,
    });

    const $tile = $('[data-identity="'+identity+'"]');
    $tile.data('name', name);
    $tile.data('color', color);
    $tile.data('icon', icon);
    $tile.find('.title').html(name);
    $tile.css('background-color', colors[color]);
    $tile.find('.icon img').attr('src', icons[icon]);
  } else {
    data = {};
    if (name) {
      data.name = name;
      data.color = color;
      data.icon = icon;
    }
    browser.contextualIdentities
      .create(data)
      .then((identity) => {
        let tile = createTile(identity);
        divTiles.appendChild(tile);
      });
  }
  $('#containerModal').modal('hide');
  event.preventDefault();
}

function openDeleteIdentityFromModal() {
}

function deleteIdentityFromModal() {
  const identity = $('#containerIdentity').val();

  $('#deleteContainerIdentity').val(identity);
  $('#containerModal').one('hidden.bs.modal', function() {
    $('#deleteContainerModal').modal('show');
  });
  $('#containerModal').modal('hide');
}

function confirmDeleteIdentity() {
  const identity = $('#containerIdentity').val();
  browser.contextualIdentities.remove(identity).then(() => {
    $('#deleteContainerModal').modal('hide');
    $('.tile[data-identity="'+identity+'"]').remove();
  });
}

function eventHandler(event) {
  let target = event.target;
  if (target.className !== "tile") {
    target = target.closest('.tile');
  }
  if (isOpenMode()) {
    browser.tabs.getCurrent().then((tabInfo) => {
      browser.tabs.create({
        cookieStoreId: target.dataset.identity
      });
      browser.tabs.remove(tabInfo.id);
    }, () => {
      console.log('error');
    });
    event.preventDefault();
    event.stopPropagation();
  }
}

function attachAction(tile, identity) {
  tile.dataset.identity = identity.cookieStoreId;
  tile.dataset.name = identity.name;
  tile.dataset.color = identity.color;
  tile.dataset.icon = identity.icon;
  tile.dataset.toggle = "modal";
  tile.dataset.target = "#containerModal";
  tile.addEventListener('click', eventHandler);
}

function createTile(identity) {
  let tile = document.createElement('div');
  tile.className = "tile";

  let content = document.createElement('div');
  content.className = "content";

  let icon = document.createElement('div');
  icon.className = "icon";

  let img = document.createElement('img');
  img.src = identity.iconUrl;

  icon.appendChild(img);

  content.appendChild(icon);

  let title = document.createElement('div');
  title.className = "title";
  title.appendChild(document.createTextNode(identity.name));

  content.appendChild(title);
  tile.appendChild(content);

  tile.style = `background-color: ${colors[identity.color]}`;

  attachAction(tile, identity);

  return tile;
}

var divTiles = document.getElementById('tile-group');

if (browser.contextualIdentities === undefined) {
  divTiles.innerText = 'browser.contextualIdentities not available. Check that the privacy.userContext.enabled pref is set to true, and reload the add-on.';
} else {
  browser.contextualIdentities.query({})
  .then((identities) => {
    identitiesLength = identities.length;
    if (!identities.length) {
      divTiles.innerText = 'No identities returned from the API.';
      return;
    }

    for (let identity of identities) {
      let tile = createTile(identity);
      divTiles.appendChild(tile);
    }

    window.addEventListener('resize', updateWidth);
    updateWidth();
  });
}

var identitiesLength = 0;

var updateWidth = () => {
  let nbElem = Math.floor((document.documentElement.clientWidth - 40) / 254);
  divTiles.style.width = (nbElem * 254) + 'px';
}

var search = document.getElementById('search');

var performSearch = function() {
  let searchVal = search.value;
  browser.tabs.getCurrent().then((tabInfo) => {
    browser.search.search({
      query: searchVal,
      tabId: tabInfo.id,
    });
  });
}
search.addEventListener('keyup', function(event) {
  let value = search.value;
  if (value) {
    value = value.toLowerCase().trim();
  }
  let elements = document.getElementsByClassName('tile');
  for (let elem of elements) {
    let name = elem.dataset.name;
    if (search.length === 0 || (name && name.toLowerCase().trim().includes(value))) {
      elem.style.display = null;
    } else {
      elem.style.display = 'none';
    }
  }
});

document.getElementById('searchBtn', performSearch);

$(function() {
  initModal();
  $('#containerModal').on('show.bs.modal', editIdentityModal);
  $('#containerModal form').on('submit', submitContainerFromModal);
  $('#saveContainer').on('click', function() {
    $('#containerModal form').submit();
  });
  $('#createIdentity').on('click', createIdentityModal);
  $('#deleteContainer').on('click', deleteIdentityFromModal);
  $('#confirmIdentityDelete').on('click', confirmDeleteIdentity);
});
