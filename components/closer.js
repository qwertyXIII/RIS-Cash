import { tabsContainer } from "./constants.js";

export function closer() {
  for (let e of tabsContainer.querySelectorAll('.tab')) {
    e.classList.add('tab_closed');
  }
  for (let e of document.querySelectorAll('.tab-selector')) {
    e.classList.remove('tab-selector_active');
  }
}