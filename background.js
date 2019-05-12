var handleClick = function() {
  var createData = {
      url: "/new-tab-page.html"
  };
  browser.tabs.create(createData);
}

browser.browserAction.onClicked.addListener(handleClick);

var handleCreated = function(newTab) {
  if (newTab.url === 'about:newtab') {
    browser.tabs.update(newTab.id, {
      url: '/new-tab-page.html',
    });
  }
}

browser.tabs.onCreated.addListener(handleCreated);