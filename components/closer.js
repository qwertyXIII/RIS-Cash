import { tabsContainer } from "./constants.js";

export function closer() {
  for (let e of tabsContainer.querySelectorAll('.tab')) {
    e.classList.add('tab_closed');
  }
}