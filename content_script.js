let selectionMode = false;
let currentHovered = null;

const IGNORE_TAGS = new Set(["HTML", "BODY"]);

function onMouseOver(e) {
  if (!selectionMode) return;

  e.preventDefault();
  e.stopPropagation();

  if (IGNORE_TAGS.has(e.target.tagName)) return;

  if (currentHovered) {
    currentHovered.classList.remove("rem-element-hover");
  }

  currentHovered = e.target;
  currentHovered.classList.add("rem-element-hover");
}

function onClick(e) {
  if (!selectionMode) return;

  e.preventDefault();
  e.stopPropagation();

  if (IGNORE_TAGS.has(e.target.tagName)) return;

  e.target.remove();
  currentHovered = null;
}

browser.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable") {
    selectionMode = true;
    document.body.style.cursor = "crosshair";
  } else if (msg.action === "disable") {
    selectionMode = false;
    document.body.style.cursor = "";
    if (currentHovered) {
      currentHovered.classList.remove("rem-element-hover");
      currentHovered = null;
    }
  }
});

document.addEventListener("mouseover", onMouseOver, true);
document.addEventListener("click", onClick, true);
