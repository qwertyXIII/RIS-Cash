import { tabsContainer } from "./constants.js";

export function opener(name) {
  tabsContainer.querySelector('.' + name).classList.remove('tab_closed');
}