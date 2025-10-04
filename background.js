let modeActive = false;

browser.browserAction.onClicked.addListener((tab) => {
  modeActive = !modeActive;
  
  browser.tabs.sendMessage(tab.id, { 
    action: modeActive ? "enable" : "disable" 
  });
  
  browser.browserAction.setTitle({
    tabId: tab.id,
    title: modeActive ? "Desactivar eliminador" : "Activar eliminador"
  });
});