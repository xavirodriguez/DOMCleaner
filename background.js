const tabStates = new Map();

browser.browserAction.onClicked.addListener((tab) => {
  const currentState = tabStates.get(tab.id) || false;
  const newState = !currentState;

  tabStates.set(tab.id, newState);

  browser.tabs
    .sendMessage(tab.id, {
      action: "toggle",
      enabled: newState,
    })
    .catch(() => {
      tabStates.delete(tab.id);
    });

  updateIcon(tab.id, newState);
});

browser.tabs.onRemoved.addListener((tabId) => {
  tabStates.delete(tabId);
});

function updateIcon(tabId, isActive = false) {
  browser.browserAction.setTitle({
    tabId: tabId,
    title: isActive ? "Desactivar eliminador" : "Activar eliminador",
  });

  browser.browserAction.setIcon({
    tabId: tabId,
    path: isActive ? "icons/icon-red.svg" : "icons/icon-black.svg",
  });
}
