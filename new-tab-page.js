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

function openModal(event) {
  const $tile = $(event.relatedTarget);
  $('#containerIdentity').val($tile.data('identity'));
  $('#containerName').val($tile.data('name'));
  $('#containerColors .btn').removeClass('active');
  $('#containerColors').find('[data-color="'+$tile.data('color')+'"]').addClass('active');
  $('#containerIcons .btn').removeClass('active');
  $('#containerIcons').find('[data-icon="'+$tile.data('icon')+'"]').addClass('active');
}

function editContainerFromModal(event) {
  const name = $('#containerName').val();
  const identity = $('#containerIdentity').val();
  const color = $('#containerColors .active').data('color');
  const icon = $('#containerIcons .active').data('icon');
  browser.contextualIdentities.update(identity, {
    name: name,
    color: color,
    icon: icon,
  });
  event.preventDefault();

  $('#editContainerModal').modal('hide');

  const $tile = $('[data-identity="'+identity+'"]');
  $tile.data('name', name);
  $tile.data('color', color);
  $tile.data('icon', icon);
  $tile.find('.title').html(name);
  $tile.css('background-color', colors[color]);
  $tile.find('.icon img').attr('src', icons[icon]);
}

function eventHandler(event) {
  let target = event.target;
  if (target.className !== "tile") {
    target = target.closest('.tile');
  }
  if (isOpenMode()) {
    browser.tabs.getCurrent().then((tabInfo) => {
      browser.tabs.create({
        url: 'about:blank',
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
  tile.dataset.target = "#editContainerModal";
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

  attachAction(tile, identity);

  return tile;
}

var div = document.getElementById('tile-group');

if (browser.contextualIdentities === undefined) {
  div.innerText = 'browser.contextualIdentities not available. Check that the privacy.userContext.enabled pref is set to true, and reload the add-on.';
} else {
  browser.contextualIdentities.query({})
  .then((identities) => {
    identitiesLength = identities.length;
    if (!identities.length) {
      div.innerText = 'No identities returned from the API.';
      return;
    }

    for (let identity of identities) {
      let tile = createTile(identity);
      tile.style = `background-color: ${colors[identity.color]}`;
      div.appendChild(tile);
    }

    window.addEventListener('resize', updateWidth);
    updateWidth();
  });
}

var identitiesLength = 0;

var updateWidth = () => {
  let nbElem = Math.floor((document.documentElement.clientWidth - 40) / 254);
  div.style.width = (nbElem * 254) + 'px';
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
  $('#editContainerModal').on('show.bs.modal', openModal);
  $('#editContainerModal form').on('submit', editContainerFromModal);
  $('#saveContainer').on('click', function() {
    $('#editContainerModal form').submit();
  });
});