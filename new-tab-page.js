var colors = {
  "blue": "#37adff",
  "turquoise": "#00c79a",
  "green": "#51cd00",
  "yellow": "#ffcb00",
  "orange": "#ff9f00",
  "red": "#ff613d",
  "pink": "#ff4bda",
  "purple": "#af51f5"
}

function eventHandler(event) {
  let target = event.target;
  if (target.className !== "tile") {
    target = target.closest('.tile');
  }
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
}

function attachAction(tile, identity) {
  tile.dataset.identity = identity.cookieStoreId;
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
  title.innerHTML = identity.name;

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