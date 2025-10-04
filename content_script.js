(function () {
  "use strict";

  const STATE = {
    active: false,
    hoveredElement: null,
    originalCursor: document.body.style.cursor,
  };

  const CONFIG = {
    hoverClass: "dcleaner-hover",
    ignoreTags: new Set(["HTML", "BODY", "HEAD"]),
  };

  function handleInteraction(e) {
    if (!STATE.active) return;

    const isClick = e.type === "click";
    const target = e.target;

    if (CONFIG.ignoreTags.has(target.tagName)) return;

    e.preventDefault();
    e.stopPropagation();

    if (isClick) {
      removeElement(target);
    } else {
      updateHover(target);
    }
  }

  function updateHover(newTarget) {
    if (STATE.hoveredElement === newTarget) return;

    clearHover();
    STATE.hoveredElement = newTarget;
    newTarget.classList.add(CONFIG.hoverClass);
  }

  function clearHover() {
    if (STATE.hoveredElement) {
      STATE.hoveredElement.classList.remove(CONFIG.hoverClass);
      STATE.hoveredElement = null;
    }
  }

  function removeElement(el) {
    clearHover();

    el.style.transition = "opacity 0.2s";
    el.style.opacity = "0";

    setTimeout(function () {
      el.remove();
    }, 200);
  }

  function activate() {
    STATE.active = true;
    STATE.originalCursor = document.body.style.cursor;
    document.body.style.cursor = "crosshair";
    document.addEventListener("mouseover", handleInteraction, true);
    document.addEventListener("click", handleInteraction, true);
  }

  function deactivate() {
    STATE.active = false;
    document.body.style.cursor = STATE.originalCursor;
    clearHover();

    document.removeEventListener("mouseover", handleInteraction, true);
    document.removeEventListener("click", handleInteraction, true);
  }

  browser.runtime.onMessage.addListener(function (msg) {
    if (msg.action !== "toggle") return;

    if (msg.enabled) {
      activate();
    } else {
      deactivate();
    }
  });
})();
