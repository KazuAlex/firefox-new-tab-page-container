var openNewTab = function() {
    var createData = {
        url: "../new-tab-page.html"
    };
    var creating = browser.tabs.create(createData);
}
document.getElementById('open-new-tab-page').onclick = openNewTab;