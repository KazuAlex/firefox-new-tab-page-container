var handleClick = function() {
  var createData = {
      url: "/new-tab-page.html"
  };
  browser.tabs.create(createData);
}

browser.browserAction.onClicked.addListener(handleClick);
